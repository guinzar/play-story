import { put, call } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from "../actions/signUp";

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
      // yield put(actions.updateSearchResults(response.data));
    } else {
      
    }
  } catch (error) {
    yield put(actions.submitSignupFailed());
  }
};
