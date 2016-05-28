import { call, fork } from 'redux-saga/effects';

import { initAppTask } from './app';
import { registerTask } from './register';
import { loginTask } from './login';
import { logoutTask } from './logout';

export default function* saga() {
  yield call(initAppTask);

  yield fork(registerTask);
  yield fork(loginTask);
  yield fork(logoutTask);
}
