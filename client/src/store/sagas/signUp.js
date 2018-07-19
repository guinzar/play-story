import { put } from 'redux-saga/effects';

import axios from 'axios';
import { logInSuccess } from "../actions/logIn";
import { signUpFailed } from "../actions/signUp";

export default function* (action) {
  try {
    if (action.formValid) {
      const response = yield axios.post("http://localhost:3090/signup",
        {
          'email': action.fields.email,
          'username': action.fields.username,
          'password': action.fields.password,
          'birthday': action.fields.birthday,
        }
      );
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', action.fields.username);
      yield put(logInSuccess(response.data.token));
    } else {
      // yield put(signUpFailed());
    }
  } catch (error) {
    if (error.response.data.field) {
      yield put(signUpFailed(error.response.data.field, error.response.data.error));
    } else {
      // yield put(signUpFailed());
    }
  }
};
