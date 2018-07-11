import { takeEvery, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import searchGamesSaga from "./addGame";
import logInSaga from "./logIn";
import signUpSaga from "./signUp";

export function* watchSearchGames() {
  yield takeLatest(actionTypes.CHANGE_SEARCH_INPUT, searchGamesSaga);
  yield takeLatest(actionTypes.LOGIN_SUBMIT, logInSaga);
  yield takeLatest(actionTypes.SIGNUP_SUBMIT, signUpSaga);
  yield takeEvery(actionTypes.REMOVE_SELECTED_GAME, searchGamesSaga);
};
