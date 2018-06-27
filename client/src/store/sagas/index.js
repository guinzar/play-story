import { takeEvery, all, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {
  searchGamesSaga,
} from "./addGame";

export function* watchSearchGames() {
  yield takeLatest(actionTypes.CHANGE_SEARCH_INPUT, searchGamesSaga);
}
