import { take, put, call } from 'redux-saga/effects';
import firebase from 'firebase';

import * as actions from '../actions';

export const isSignedIn = () => {
  return new Promise(resolve => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export function* initAppTask() {
  yield take(actions.INIT_APP);

  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyDQcczTh2nOMon1pITjoGlNcrgQL0AVjBo',
    authDomain: 'authify.firebaseapp.com',
    databaseURL: 'https://authify.firebaseio.com',
    storageBucket: 'firebase-authify.appspot.com'
  };

  firebase.initializeApp(config);

  const user = yield call(isSignedIn);

  if (user) {
    yield put({ type: actions.LOGIN_SUCCESS });
  }
}