import { put } from 'redux-saga/effects';

import axios from 'axios';
import { tokenAuthSuccess, logOut } from "../actions/auth";
import { showHomeStories } from "../actions/home";
import { showUserStories } from "../actions/user";
import { showUserGames } from "../actions/games";

export default function* (action) {
  try {
    const url = action.page === 'home' ? 'home' : `user/${action.user}${action.page === 'user' ? '' : `/${action.page}`}`;
    // console.log(url);
    const response = yield axios.get(`http://localhost:3090/${url}`, {
      headers: {
        'authorization': action.token
      }
    });
    // console.log(response.data);
    const user = response.data.user;
    if (user) {
      localStorage.setItem('username', user.username);
      yield put(tokenAuthSuccess(user));
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
        if (response.data.games) {
          yield put(showUserGames(response.data.games));
        }
        break;
      case 'timeline':
        break;
    }
  } catch (error) {
    // yield put(logInFailed());
  }
};
