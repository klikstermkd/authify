import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { register } from '../actionCreators';

class Register extends React.Component {
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
      register,
      registerErrorMessage,
      isLoading,
      registerSuccess
    } = this.props;

    return (
      <div>
        <h1>Register</h1>

        <form onSubmit={register(this.state.user.email, this.state.user.password)}>
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
          <input type="submit" disabled={isLoading} value="Register" />
          <div>{ registerErrorMessage }</div>
          {/*<div>{ registerSuccess ? 'User created.' : null }</div>*/}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    registerErrorMessage: state.app.register.errorMessage,
    isLoading: state.app.register.isLoading,
    registerSuccess: state.app.register.success
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (email, password) => bindActionCreators(register(email, password), dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);