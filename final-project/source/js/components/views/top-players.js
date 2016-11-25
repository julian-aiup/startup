import AuthService from '../../utils/AuthService';
import firebase from 'firebase';
import RaisedButton from "material-ui/RaisedButton";
import React, { PropTypes as T } from "react";

class TopPlayers extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      topPlayers: []
    };
    this.getTopPlayers = this.getTopPlayers.bind(this);
    this.getTopPlayers();
  }

  getTopPlayers() {
    let usersDb = `users`;
    let thisHome = this;
    let users = [];
    firebase.database().ref(usersDb).orderByChild("points").limitToFirst(2).once('value').then(function(snapshot) {
      let usersKeys = snapshot.val();
      Object.keys(usersKeys).forEach((user) => {
        users.push({ name: usersKeys[user].name , points: usersKeys[user].points });
      });
      users.reverse();
      this.setState({ topPlayers: users });
    });
  }

  static contextTypes: {
    router: T.object
  }

  render () {
    return <h1>hola</h1>;
    if(this.state.profile.name) {
      return(
        <div className="home-page">
          <h2>Welcome to Countries Trivia { this.state.profile.name }!</h2>
          <h3>
            You have<span className='points'>{ this.state.points }</span>points
          </h3>
        </div>
      );
    } else {
      return (
        <div className="home-page">
          <h2>Welcome to Countries Trivia!</h2>
          <h3>Please login to play the game</h3>
        </div>
      );
    }
  }
}

TopPlayers.propTypes = {
  auth: T.instanceOf(AuthService)
};

export default TopPlayers;
