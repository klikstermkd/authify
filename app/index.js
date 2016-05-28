import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import App from './components/App';
import configureStore from './configureStore';
import configureRoutes from './routes';
import { initApp } from './actionCreators';
import * as actions from './actions';

const store = configureStore();
const routes = configureRoutes(store);

store.dispatch(initApp());

// If the user deletes the firebase item in localStorage,
// then logout the user
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    store.dispatch({ type: actions.LOGOUT });
  }
});

ReactDOM.render(
  <Provider store={ store }>
    <Router routes={ routes } history={ browserHistory } />
  </Provider>,
  document.querySelector('#app')
);