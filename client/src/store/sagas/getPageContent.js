import { put } from 'redux-saga/effects';

import axios from 'axios';
import { logInSuccess, logInFailed } from "../actions/logIn";

export default function* (action) {
  try {
    console.log('getting page content: ', action.page);
    if (action.formValid) {
      const response = yield axios.post("http://localhost:3090/login",
        {
          'username': action.fields.username,
          'password': action.fields.password,
        }
      );
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      yield put(logInSuccess(response.data.token));
    } else {
      
    }
  } catch (error) {
    yield put(logInFailed());
  }
};
