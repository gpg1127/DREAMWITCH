import { all, call, fork } from "redux-saga/effects";
import todo from "./todo";
import user from "./user";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3065/api";

export default function* rootSaga() {
  yield all([fork(todo), fork(user)]);
}
