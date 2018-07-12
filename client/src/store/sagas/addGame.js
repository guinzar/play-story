import { put, call } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from "../actions/addGame";
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
      yield put(actions.updateSearchResults(response.data));
    } else {
      yield put(actions.updateSearchResults([]));
    }
  } catch (error) {
    yield put(actions.updateSearchResultsFailed());
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
    console.log(response.data);
  } catch (error) {
    yield put(actions.updateSearchResultsFailed());
  }
};
