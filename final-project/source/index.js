import App from './js/app.js';
import {browserHistory} from 'react-router';
import firedux from './store/firedux'
import makeRoutes from './js/routes.js';
import { Provider } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import store from "./js/store";

firedux.watch('');

const routes = makeRoutes();
const mountNode = document.querySelector('#app');

ReactDOM.render((
  <Provider store={store}>
    <App history={browserHistory} routes={routes} />
  </Provider>
), mountNode);
