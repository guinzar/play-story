import { put } from 'redux-saga/effects';

import axios from 'axios';
import { tokenAuthSuccess, logOut } from "../actions/auth";
import { showHomeStories } from "../actions/home";

export default function* (action) {
  try {
    console.log('getting page content: ', action.page);
    const response = yield axios.get("http://localhost:3090/home", {
      headers: {
        'authorization': action.token
      }
    });
    console.log(response.data);
    const username = response.data.username;
    if (username) {
      yield put(tokenAuthSuccess(username));
    } else if (action.token) {
      yield put(logOut);
    }
    yield put(showHomeStories(response.data.stories));
  } catch (error) {
    // yield put(logInFailed());
  }
};
