import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";
import { Provider } from "react-redux";

//import store from "./js/store.js";
import MainLayout from "./js/components/layouts/main-layout.js"
import Home from "./js/components/home.js";
import PlayGameContainer from "./js/components/containers/play-game-container.js";

ReactDOM.render((
    <Router history={browserHistory}>
      <Route component={MainLayout}>
        <Route path="/" component={Home} />
        <Route path="playGame" component={PlayGameContainer} />
      </Route>
    </Router>
), document.getElementById("app"));

{/* <Provider store={store}>
</Provider> */}
