import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import searchGamesSaga from './addGame';
import logInSaga from './logIn';
import signUpSaga from './signUp';
import getUserContentSaga from './getUserContent';

export function* watchSearchGames() {
  // Auth
  yield takeLatest(actionTypes.LOGIN_SUBMIT, logInSaga);
  yield takeLatest(actionTypes.SIGNUP_SUBMIT, signUpSaga);
  yield takeLatest(actionTypes.GET_USER_CONTENT, getUserContentSaga);
  // AddGame
  yield takeLatest(actionTypes.CHANGE_SEARCH_INPUT, searchGamesSaga);
  yield takeEvery(actionTypes.REMOVE_SELECTED_GAME, searchGamesSaga);
};
