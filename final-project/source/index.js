import { browserHistory, IndexRoute, Router, Route } from "react-router";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

//import store from "./js/store.js";
import MainLayout from "./js/components/layouts/main-layout.js"
import Home from "./js/components/home.js";
import PlayGameContainer from "./js/components/containers/play-game-container.js";

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={Home} />
        <Route path="playGame" component={PlayGameContainer} />
      </Route>
    </Router>
), document.getElementById("app"));

{/* <Provider store={store}>
</Provider> */}
