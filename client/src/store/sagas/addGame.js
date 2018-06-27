import { put, call } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from "../actions";
import IGDB_API_KEY from '../../config';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* searchGamesSaga(action) {
  try {
    yield call(delay, 500);
    console.log('searching for: ' + action.input);
    if (action.input.length) {
      const response = yield axios.get("https://cors-anywhere.herokuapp.com/https://api-2445582011268.apicast.io/games/",
        {
          headers: {
            'user-key': IGDB_API_KEY,
            'Accept': 'application/json'
          },
          params: {
            'search': action.input,
            'fields': 'name,summary,genres,first_release_date,platforms,cover,websites'
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
}
