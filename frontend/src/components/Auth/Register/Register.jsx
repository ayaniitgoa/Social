import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { registerUser } from '../../../reduxSetup/actions/authActions';
import { clearErrors } from '../../../reduxSetup/actions/errorActions';

import './Register.css';

function Register(props) {
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const registerFormOnSubmit = (e) => {
    setMsg(null);
    e.preventDefault();
    const newUser = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    };

    props.registerUser(newUser);
  };

  useEffect(() => {
    if (props.error.id === 'REGISTER_FAIL') {
      setMsg(props.error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [props.error, props.isAuthenticated]);

  return (
    <div>
      <h1>Register</h1>
      <form action='' onSubmit={registerFormOnSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          placeholder='Name'
          name='name'
          id='register__name'
          value={registerName}
          onChange={(e) => {
            setRegisterName(e.target.value);
          }}
        />
        <label htmlFor='name'>Email</label>
        <input
          type='email'
          placeholder='email'
          name='email'
          id='register__email'
          value={registerEmail}
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='text'
          placeholder='password'
          name='password'
          id='register__password'
          value={registerPassword}
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        />

        <button id='register__button' type='submit'>
          Register
        </button>
      </form>
      {msg}
    </div>
  );
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  Register
);
