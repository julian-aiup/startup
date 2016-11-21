import RaisedButton from 'material-ui/RaisedButton';
import React from "react";

export default class PlayGame extends React.Component {
  constructor(props) {
    super(props);
    this.selectCountries = this.selectCountries.bind(this);
    this.selectCorrectCountry = this.selectCorrectCountry.bind(this);
    this.selectIncorrectCountries = this.selectIncorrectCountries.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.state = {
      countriesOptions: []
    };
    // If the storage object hasn't already been populated
    if(!sessionStorage.getItem("countries")) {
      fetch("http://api.geonames.org/countryInfoJSON?username=julian.aiup")
        .then((response) => {
          return response.json()
        })
        .then((countries) => {
          // Save countries to sessionStorage
          sessionStorage.setItem("countries", JSON.stringify(countries.geonames));
        });
    }
  }

  render() {
    console.log(this.state.countriesOptions);
    return (this.state.countriesOptions.length === 4) ? this.renderGame() : this.renderLoading();
  }

  componentWillMount() {
    // Select countries options
    this.selectCountries();
  }

  renderLoading() {
    return (
      <div className="play-game">
        <h3>Hola</h3>
      </div>
    );
  }

  renderGame() {
    return (
      <div className="play-game">
        <h3>Game</h3>
        <img src={`http://www.geonames.org/flags/x/${ this.state.countriesOptions[0].info.countryCode.toLowerCase() }.gif`} className="flag" />
        {this.state.countriesOptions.map((country) => {
          return(
            <RaisedButton label={country.info.countryName} primary={true} className="countryOption" fullWidth={true} />
          )
        })}
      </div>
    );
  }

  selectCountries() {
    let countriesJSON = JSON.parse(sessionStorage.getItem("countries"));
    let countriesOptions = [];
    countriesOptions = this.selectCorrectCountry(countriesJSON, countriesOptions);
    countriesOptions = this.selectIncorrectCountries(countriesJSON, countriesOptions);
    this.setState({
      countriesOptions
    });
  }

  selectCorrectCountry(countriesJSON, countriesOptions) {
    // Selects correct country randomly (between 0 and the quantity of countries)
    let correctCountryPosition = Math.floor(Math.random() * countriesJSON.length);
    // Select country from correctCountryPosition and store country info in variable
    let correctCountryInfo = countriesJSON[correctCountryPosition];
    // Create the correct country option and add it to the array
    let correctCountryOption = Object.assign(
      {},
      { position: correctCountryPosition },
      { info: correctCountryInfo },
      { correct: true }
    );
    return countriesOptions.concat(correctCountryOption);
  }

  selectIncorrectCountries(countriesJSON, countriesOptions) {
    // Selects other incorrect options
    const TOTAL_OPTIONS = 3;
    let option = 0;
    let incorrectCountryPosition;
    let indexCountry;
    let incorrectCountryInfo;
    let incorrectCountryOption;
    while(option < TOTAL_OPTIONS) {
      incorrectCountryPosition = Math.floor(Math.random() * countriesJSON.length);
      // Equals -1 when isn't already selected
      indexCountry = this.state.countriesOptions.findIndex((arrayCountry) => {
          return incorrectCountryPosition === arrayCountry.position
        }
      );
      if(indexCountry === -1) {
        // Create a new incorrect country option and add it to the array
        incorrectCountryInfo = countriesJSON[incorrectCountryPosition];
        incorrectCountryOption = Object.assign(
          {},
          { position: incorrectCountryPosition },
          { info: incorrectCountryInfo },
          { correct: false }
        );
        countriesOptions = countriesOptions.concat(incorrectCountryOption);
        option++;
      }
    }
    return countriesOptions;
  }
}
