import { put, call } from 'redux-saga/effects';

import axios from 'axios';
import { updateSearchResults, updateSearchResultsFailed } from "../actions/addGame";
import { addGameSuccess } from "../actions/games";
import { IGDB_API_KEY } from '../../config';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export function* searchGamesSaga(action) {
  try {
    yield call(delay, 500);
    if (action.input.length) {
      const response = yield axios.get('http://localhost:3090/games/search',
        {
          headers: {
            'Accept': 'application/json'
          },
          params: {
            'search': action.input,
          }
        }
      );
      yield put(updateSearchResults(response.data));
    } else {
      yield put(updateSearchResults([]));
    }
  } catch (error) {
    yield put(updateSearchResultsFailed());
  }
};
export function* submitGameSaga(action) {
  try {
    const response = yield axios.post(`http://localhost:3090/user/${action.username}`,
      action.gameData,
      {
        headers: {
          'authorization': action.token
        }
      }
    );
    if (response.data.game) {
      console.log(response.data.game)
      yield put(addGameSuccess(response.data.game));
    } else {
      //fail
    }
  } catch (error) {

    // yield put(updateSearchResultsFailed());
  }
};
