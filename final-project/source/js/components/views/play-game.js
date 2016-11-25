import { browserHistory } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import firebase from 'firebase';
import getCountriesOptions from "../../utils/country-api.js";
import RaisedButton from "material-ui/RaisedButton";
import React from "react";

export default class PlayGame extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.getButtonDisabledBackgroundColor = this.getButtonDisabledBackgroundColor.bind(this);
    this.getDisabled = this.getDisabled.bind(this);
    this.renderAnswered = this.renderAnswered.bind(this);
    this.state = {
      countriesOptions: [],
      correctCountryPosition: null,
      selectedCountry: null,
      secondsElapsed: 0
    };
  }

  render() {
    return (this.state.countriesOptions.length === 4) ? this.renderGame() : this.renderLoading();
  }

  componentWillMount() {
    let correctCountryPosition;
    // Select countries options and store in state
    getCountriesOptions((countriesOptions) => {
      correctCountryPosition = countriesOptions.findIndex((element) => {
        return element.correct;
      });
      this.setState({ countriesOptions, correctCountryPosition });
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderLoading() {
    return (
      <div className="play-game">
        <h3 className="loading">Loading game! Please wait</h3>
        <CircularProgress size={80} thickness={5} />
      </div>
    );
  }

  renderGame() {
    return (
      <div className="play-game">
        {this.renderAnswered()}
        <img src={`http://www.geonames.org/flags/x/${ this.state.countriesOptions[this.state.correctCountryPosition].info.countryCode.toLowerCase() }.gif`} className="flag" />
        {this.state.countriesOptions.map((country) => {
          return(
            <RaisedButton
              backgroundColor = "#03A9F4"
              className = "countryOption"
              disabled = { this.getDisabled() }
              disabledBackgroundColor = { this.getButtonDisabledBackgroundColor(country) }
              fullWidth = { true }
              label = { country.info.countryName }
              onTouchTap = { this.selectCountryOption.bind(this, country) }
            />
          )
        })}
      </div>
    );
  }

  renderAnswered() {
    let textResult;
    if (this.state.selectedCountry) {
      if (this.state.selectedCountry === this.state.countriesOptions[this.state.correctCountryPosition]) {
        textResult = 'You won!';
      } else {
        textResult = 'You lost';
      }
      return(
        <div className='result'>
          <h2>{textResult}</h2>
          <CircularProgress
            className='progress'
            mode="determinate"
            value={this.state.secondsElapsed * 20}
            size={80}
            thickness={5}
          />
        </div>
      );
    } else {
      return <h3>Game</h3>;
    }
  }

  tick() {
    this.setState((prevState) => ({
      secondsElapsed: prevState.secondsElapsed + 1
    }));
    if (this.state.secondsElapsed > 5) {
      browserHistory.push('/home');
    }
  }

  selectCountryOption(selectedCountry) {
    this.setState(
      { selectedCountry },
      () => {
        this.interval = setInterval(() => this.tick(), 1000);
        // If the user wins, sum one point
        if (this.state.selectedCountry === this.state.countriesOptions[this.state.correctCountryPosition]) {
          let firebaseRef = firebase.database().ref(`users/${this.props.auth.getProfile().user_id}/points`);
          // let userRef = firebaseRef.child();
          // userRef.update({
          //   "points": userRef.
          // });

          // var upvotesRef = db.ref("server/saving-data/fireblog/posts/-JRHTHaIs-jNPLXOQivY/upvotes");
          firebaseRef.transaction(function (current_value) {
            return (current_value || 0) + 1;
          });
        }
      }
    );
  }

  getButtonDisabledBackgroundColor(country) {
    if (country.correct) {
      return "#4CAF50";
    } else if (this.state.selectedCountry === country) {
      return "#E57373";
    }
  }

  getDisabled() {
    return (this.state.selectedCountry) ? true : false;
  }
}
