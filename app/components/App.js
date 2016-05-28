import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../actions';
 
const App = ({ children, logout, auth }) => (
  <div>
    <ul>
      { !auth ? <li><Link to="/login">Login</Link></li> : null }
      { !auth ? <li><Link to="/register">Register</Link></li> : null }
      { auth ? <li onClick={logout}>Logout</li> : null }
    </ul>

    <div>{ children }</div>
  </div>
);

const mapStateToProps = state => ({ auth: state.user.auth });

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({ type: actions.LOGOUT })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);