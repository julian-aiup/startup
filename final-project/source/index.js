import App from './js/app.js';
import {browserHistory} from 'react-router';
import makeRoutes from './js/routes.js';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
//import store from "./js/store.js";

const routes = makeRoutes();
const mountNode = document.querySelector('#app');

ReactDOM.render((
  <App history={browserHistory} routes={routes} />
), mountNode);

{/* <Provider store={store}>
</Provider> */}
