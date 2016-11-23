import CircularProgress from 'material-ui/CircularProgress';
import getCountriesOptions from "../../utils/country-api.js";
import RaisedButton from "material-ui/RaisedButton";
import React from "react";

export default class PlayGame extends React.Component {
  constructor(props) {
    super(props);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.getButtondisabledBackgroundColor = this.getButtondisabledBackgroundColor.bind(this);
    this.getDisabled = this.getDisabled.bind(this);
    this.state = {
      countriesOptions: [],
      correctCountryPosition: null,
      selectedCountry: null
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
        <h3>Game</h3>
        <img src={`http://www.geonames.org/flags/x/${ this.state.countriesOptions[this.state.correctCountryPosition].info.countryCode.toLowerCase() }.gif`} className="flag" />
        {this.state.countriesOptions.map((country) => {
          return(
            <RaisedButton
              backgroundColor = "#03A9F4"
              className = "countryOption"
              disabled = { this.getDisabled() }
              disabledBackgroundColor = { this.getButtondisabledBackgroundColor(country) }
              fullWidth = { true }
              label = { country.info.countryName }
              onTouchTap = { this.selectCountryOption.bind(this, country) }
            />
          )
        })}
      </div>
    );
  }

  selectCountryOption(selectedCountry) {
    this.setState({ selectedCountry });
  }

  getButtondisabledBackgroundColor(country) {
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
