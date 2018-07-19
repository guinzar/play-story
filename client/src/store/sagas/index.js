import { all, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { searchGamesSaga, editGameSaga } from './editGame';
import logInSaga from './logIn';
import signUpSaga from './signUp';
import getUserContentSaga from './getUserContent';

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.LOGIN_SUBMIT, logInSaga),
    takeLatest(actionTypes.SIGNUP_SUBMIT, signUpSaga),
    takeLatest(actionTypes.GET_USER_CONTENT, getUserContentSaga)
  ]);
};

export function* watchEditGame() {
  yield all([
    takeLatest(actionTypes.CHANGE_SEARCH_INPUT, searchGamesSaga),
    takeLatest(actionTypes.REMOVE_SELECTED_GAME, searchGamesSaga),
    takeLatest(actionTypes.EDIT_GAME_SUBMIT, editGameSaga)
  ]);
};
