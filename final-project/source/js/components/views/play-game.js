import React from "react";

export default class PlayGame extends React.Component {
  constructor(props) {
    var countries;
    super(props);
    this.selectCountries = this.selectCountries.bind(this);
    this.selectCorrectCountry = this.selectCorrectCountry.bind(this);
    this.selectIncorrectCountries = this.selectIncorrectCountries.bind(this);
    this.state = {
      countriesOptions: []
    };
  }

  render() {
    return (
      <div className="play-game">
        <h3>Holaaa</h3>
      </div>
    );
  }

  componentWillMount() {
    // If the storage object hasn't already been populated
    if(!sessionStorage.getItem("countries")) {
      fetch("http://api.geonames.org/countryInfoJSON?username=julian.aiup")
        .then((response) => {
          return response.json()
        })
        .then((countries) => {
          // Save countries to sessionStorage
          sessionStorage.setItem("countries", JSON.stringify(countries.geonames));
          // Select countries options
          this.selectCountries();
        });
    } else {
      // Select countries options
      this.selectCountries();
    }
  }

  selectCountries() {
    let countriesJSON = JSON.parse(sessionStorage.getItem("countries"));
    this.selectCorrectCountry(countriesJSON);
    this.selectIncorrectCountries(countriesJSON);
  }

  selectCorrectCountry(countriesJSON) {
    // Selects the correct country randomly (between 0 and the quantity of countries)
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
    let countriesOptions = this.state.countriesOptions.concat(correctCountryOption);
    this.setState({
      countriesOptions
    });
  }

  selectIncorrectCountries(countriesJSON) {
    // Selects other resting options
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
        let countriesOptions = this.state.countriesOptions.concat(incorrectCountryOption);
        this.setState({
          countriesOptions
        });
        option++;
      }
    }
  }
}
