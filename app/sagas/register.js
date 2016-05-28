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
import { registerError } from '../actionCreators';

export function registerUser(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
      resolve(user);
    }).catch(error => {
      reject(error);
    })
  });
}

export function* registerTask() {
  while (true) {
    const { email, password } = yield take(actions.REGISTER_REQUEST);
    
    try {
      yield call(registerUser, email, password);
      yield put({ type: actions.REGISTER_SUCCESS });

      browserHistory.push('/login');
    } catch (error) {
      yield put(registerError(error.message));
    } finally {
      if (yield cancelled()) {
        console.log('registerUser was cancelled');
      }
    }
  }
}