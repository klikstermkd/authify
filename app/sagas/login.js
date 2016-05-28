import { 
  take, 
  call,
  cancelled,
  select,
  put
} from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import firebase from 'firebase';

import * as actions from '../actions';
import { loginError } from '../actionCreators';

export function loginUser(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
      resolve(user);
    }).catch(error => {
      reject(error);
    });
  });
}

export function* loginTask() {
  while (true) {
    const { email, password } = yield take(actions.LOGIN_REQUEST);
    
    try {
      const authData = yield call(loginUser, email, password);

      yield put({ type: actions.LOGIN_SUCCESS });

      browserHistory.push('/');
    } catch(error) {
      yield put(loginError(error.message));
    } finally {
      if (yield cancelled()) {
        console.log('loginUser was cancelled');
      }
    }
  }
}