import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../../reduxSetup/actions/authActions';
import './Logout.css';
import { withRouter } from 'react-router-dom';

function Logout(props) {
  const logoutUser = () => {
    props.history.push('/');
    props.logout();
  };

  return (
    <div>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(withRouter(Logout));
