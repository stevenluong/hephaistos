import React, { Component } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import SignInSide from './User/SignInSide';
import SignUp from './User/SignUp';
import Main from './Main';
import Profile from './User/Profile';
import config from './app.config';
import Notfound from './NotFound'

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  return (
    <Security issuer={config.issuer}
              clientId={config.clientId}
              redirectUri={config.redirectUri}
              onAuthRequired={onAuthRequired}
              pkce={true} >
      <Switch>
        <SecureRoute path='/' exact={true} render={() => <Main url="dashboard" />} />
        <Route path='/login' render={() => <SignInSide baseUrl={config.url} />} />
        <Route path='/signup' render={() => <SignUp baseUrl={config.url} />} />
        <Route path='/implicit/callback' component={LoginCallback} />
        <SecureRoute path='/profile' render={() => <Main url="profile" />} />
        <SecureRoute path='/simulator' render={() => <Main url="simulator" />} />
        <Route component={Notfound} />
      </Switch>
    </Security>
  );
};
export default AppWithRouterAccess;