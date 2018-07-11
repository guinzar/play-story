import { put } from 'redux-saga/effects';

import axios from 'axios';
import { tokenAuthSuccess, logOut } from "../actions/auth";
import { showHomeStories } from "../actions/home";
import { showUserStories } from "../actions/user";

export default function* (action) {
  try {
    console.log('getting page content: ', action.page);
    const response = yield axios.get(`http://localhost:3090/${action.page}`, {
      headers: {
        'authorization': action.token
      }
    });
    console.log(response.data);
    const username = response.data.username;
    if (username) {
      yield put(tokenAuthSuccess(username));
    } else if (action.token) {
      yield put(logOut());
    }
    switch (action.page) {
      case 'home':
        yield put(showHomeStories(response.data.stories));
        break;
      case 'user':
      yield put(showUserStories(response.data.stories));
        break;
      case 'games':
        break;
      case 'timeline':
        break;
    }
  } catch (error) {
    // yield put(logInFailed());
  }
};
