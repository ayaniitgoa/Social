import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../../reduxSetup/actions/authActions';
import { clearErrors } from '../../../reduxSetup/actions/errorActions';

import './Login.css';

function Login(props) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const loginFormOnSubmit = (e) => {
    e.preventDefault();
    setMsg(null);
    const user = {
      email: loginEmail,
      password: loginPassword,
    };

    props.loginUser(user);
  };

  useEffect(() => {
    if (props.error.id === 'LOGIN_FAIL') {
      setMsg(props.error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [props.error, props.isAuthenticated]);

  return (
    <div>
      <h1>Login</h1>
      <form action='' onSubmit={loginFormOnSubmit}>
        <label htmlFor='name'>Email</label>
        <input
          type='email'
          placeholder='email'
          name='email'
          id='login__email'
          value={loginEmail}
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='text'
          placeholder='password'
          name='password'
          id='login__password'
          value={loginPassword}
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />

        <button id='login__button' type='submit'>
          login
        </button>
      </form>
      {msg}
    </div>
  );
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { loginUser, clearErrors })(Login);
