import firebase from 'firebase';

import App from './components/App';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import * as actions from './actions';

export default ({ dispatch }) => (
  {
    path: '/',
    component: App,
    indexRoute: { 
      component: Dashboard,
      onEnter(nextState, replace, callback) {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe();

          if (!user) {
            replace('/login');
          }

          callback();
        });
      }
    },
    childRoutes: [
      { 
        path: '/login', 
        component: Login,
        onEnter(nextState, replace, callback) {
          const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();

            if (user) {
              replace('/dashboard');
            }

            callback();
          });
        },
        onLeave() {
          dispatch({ type: actions.RESET_LOGIN_ERROR });
        }
      },
      { 
        path: '/register', 
        component: Register,
        onEnter(nextState, replace, callback) {
          const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            
            if (user) {
              replace('/dashboard');
            }

            callback();
          });
        },
        onLeave() {
          dispatch({ type: actions.RESET_REGISTER_ERROR });
        }
      },
      
      // If there is a non-matching route,
      // redirect to index
      {
        path: '/*',
        onEnter(nextState, replace) {
          replace('/');
        }
      }
    ]
  }
);