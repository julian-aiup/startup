import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory } from "react-router";
import { Provider } from "react-redux";
import store from "./js/store";

import MainLayout from "./js/components/layouts/main-layout.js"
import Home from "./js/components/home.js";
import MovieListContainer from "./js/components/containers/movie-list-container.js";
import MovieFormContainer from "./js/components/containers/movie-form-container.js";

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={MainLayout}>
        <Route path="/" component={Home} />
        <Route path="movies" component={MovieListContainer} />
        <Route path="movie" component={MovieFormContainer} />
        <Route path="movie/:movieId" component={MovieFormContainer} />
      </Route>
    </Router>
  </Provider>
), document.getElementById("app"));
