import { put } from 'redux-saga/effects';

import axios from 'axios';
import { logInSuccess } from "../actions/logIn";
import { signUpFailed } from "../actions/signUp";

export default function* (action) {
  try {
    console.log('submitting form: ', action.formValid);
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
      yield put(logInSuccess(response.data.token));
    } else {
      
    }
  } catch (error) {
    if (error.response.data.field) {
      yield put(signUpFailed(error.response.data.field, error.response.data.error));
    } else {
      // yield put(signUpFailed());
    }
  }
};