import AuthService from '../../utils/AuthService.js';
import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import MainLayout from "../layouts/main-layout.js";
import Home from "./home.js";
import PlayGameContainer from "../containers/play-game-container.js";
import Login from "./login.js";

const auth = new AuthService('xoZIPD4lfj3dpDrePlhfhqPhT6cZKGPX', 'julian-aiup.auth0.com');

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={MainLayout} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} />
      <Route path="login" component={Login} />
      <Route path="playGame" component={PlayGameContainer} onEnter={requireAuth} />
    </Route>
  )
}

export default makeMainRoutes;
