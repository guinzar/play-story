import { put } from 'redux-saga/effects';

import axios from 'axios';
import { logInSuccess, logInFailed } from "../actions/logIn";

export default function* (action) {
  try {
    if (action.formValid) {
      const response = yield axios.post("http://localhost:3090/login",
        {
          'username': action.fields.username,
          'password': action.fields.password,
        }
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', action.fields.username);
      yield put(logInSuccess(response.data.token));
    } else {
      
    }
  } catch (error) {
    yield put(logInFailed());
  }
};
