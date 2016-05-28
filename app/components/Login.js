import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from '../actionCreators';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(type) {
    return (event) => {
      const value = event.target.value;
      const permittedTypes = ['email', 'password'];

      if (permittedTypes.indexOf(type) === -1) {
        throw new Error('Input type not permitted.');
      }

      this.setState({ user: { ...this.state.user, [type]: value } });
    }
  }

  render() {
    const { 
      login,
      loginErrorMessage,
      isLoading,
      loginSuccess
    } = this.props;

    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={login(this.state.user.email, this.state.user.password)}>
          <input 
            type="email" 
            value={this.state.user.email} 
            placeholder="email"
            onChange={this.handleChange('email')} />
          <input 
            type="password" 
            value={this.state.user.password} 
            placeholder="password"
            onChange={this.handleChange('password')} />
          <input type="submit" disabled={isLoading} value="Login" />
          <div>{ loginErrorMessage }</div>
          {/*<div>{ loginSuccess ? 'User created.' : null }</div>*/}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginErrorMessage: state.app.login.errorMessage,
    isLoading: state.app.login.isLoading,
    loginSuccess: state.app.login.success
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => bindActionCreators(login(email, password), dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);