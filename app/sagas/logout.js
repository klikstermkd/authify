import { take, call } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import firebase from 'firebase';

import * as actions from '../actions';

export const logoutUser = (email, password) => {
  return new Promise(resolve => {
    firebase.auth().signOut().then(() => {
      browserHistory.push('/login');
      resolve();
    });
  });
}

export function* logoutTask() {
  while (yield take(actions.LOGOUT)) {
    try {
      yield call(logoutUser);
    } catch(error) {
      console.log('logout error: ', error);
    }
  }
}