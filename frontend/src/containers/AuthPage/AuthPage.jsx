import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Register from '../../components/Auth/Register/Register';
import Login from '../../components/Auth/Login/Login';
import { Redirect, withRouter } from 'react-router-dom';

function AuthPage() {
  return (
    <div>
      {localStorage.getItem('token') ? (
        <Redirect to='/profile' />
      ) : (
        <div className=''>
          <Register />
          <Login />
        </div>
      )}
    </div>
  );
}

AuthPage.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(withRouter(AuthPage));
