import React from "react";
import { Link } from "react-router";

export default class MainLayout extends React.Component {
  render () {
    return (
      <div className="app">
      <h1>Movies</h1>
        <ul role="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movies">List</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
