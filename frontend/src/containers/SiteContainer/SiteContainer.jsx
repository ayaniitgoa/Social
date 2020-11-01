import React, { useEffect } from 'react';
import './SiteContainer.css';
import { loadUser } from '../../reduxSetup/actions/authActions';
import store from '../../reduxSetup/store';
import AuthPage from '../AuthPage/AuthPage';
import { Route, Switch } from 'react-router-dom';
import Profile from '../Profile/Profile';
import PrivateRoute from '../../PrivateRoute';
import Home from '../Home/Home';

function SiteContainer() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path='/' component={AuthPage} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/home' component={Home} />
      </Switch>
    </div>
  );
}

export default SiteContainer;
