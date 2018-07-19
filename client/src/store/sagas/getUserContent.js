import { put } from 'redux-saga/effects';
import axios from 'axios';
import { tokenAuthSuccess, logOut } from '../actions/auth';
import { showHomeStories } from '../actions/home';
import { showUserStories } from '../actions/user';
import { showUserGames } from '../actions/games';
import { showUserTimeline } from '../actions/timeline';
import { SERVER_URL } from '../../config';

export default function* (action) {
  try {
    const url = action.page === 'home' ? 'home' : `user/${action.user}${action.page === 'user' ? '' : `/${action.page}`}`;
    const response = yield axios.get(`${SERVER_URL}/${url}`, {
      headers: {
        'authorization': action.token
      }
    });
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
        yield put(showUserGames(response.data.games));
        break;
      case 'timeline':
        yield put(showUserTimeline(response.data.games));
        break;
      default:
        // no page
    }
  } catch (error) {
    // yield get content failed;
  }
};
