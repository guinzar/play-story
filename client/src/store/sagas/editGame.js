import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { updateSearchResults, updateSearchResultsFailed, editGameFailed } from '../actions/editGame';
import { addGameSuccess, editGameSuccess, removeGameSuccess } from '../actions/games';
import { SERVER_URL } from '../../config';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export function* searchGamesSaga(action) {
  try {
    yield call(delay, 500);
    if (action.input.length) {
      const response = yield axios.get(`${SERVER_URL}/games`,
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
export function* editGameSaga(action) {
  try {
    const response = yield axios.post(`${SERVER_URL}/user/${action.username}`,
      {
        type: 'game',
        remove: action.remove,
        game: action.gameData
      },
      {
        headers: {
          'authorization': action.token
        }
      }
    );
    if (response.data.game) {
      if (action.remove) {
        yield put(removeGameSuccess(response.data.game));
      } else if (response.data.isEdit) {
        yield put(editGameSuccess(response.data.game));
      } else {
        yield put(addGameSuccess(response.data.game));
      }
    } else {
      yield put(editGameFailed());
    }
  } catch (error) {
    yield put(editGameFailed());
  }
};
