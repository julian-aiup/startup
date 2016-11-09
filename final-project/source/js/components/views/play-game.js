import React from "react";

export default class PlayGame extends React.Component {
  constructor(props) {
    var countries;
    super(props);
    this.state = {
      countries: []
    };
    this.selectCountries = this.selectCountries.bind(this);
  }

  render() {
    return (
      <div className="play-game">
        <h3>Holaaa</h3>
      </div>
    );
  }

  componentWillMount() {
    fetch("http://api.geonames.org/countryInfoJSON?username=julian.aiup")
      .then((response) => {
        return response.json()
      })
      .then((countries) => {
        this.setState({ countries: countries.geonames });
        this.selectCountries();
      });
  }

  selectCountries() {
    let countriesOptions = [];
    const totalOptions = 3;
    let correctCountryPosition;
    let correctCountryInfo;
    let correctCountry;
    let option;
    // Selects one of the countries randomly (between 0 and the quantity of countries)
    correctCountryPosition = Math.floor(Math.random() * this.state.countries.length);
    console.log(correctCountryPosition);
    // Store country info in variable
    correctCountryInfo = this.state.countries[correctCountryPosition];

    correctCountry = Object.assign({}, { position: correctCountryPosition }, { info: correctCountryInfo }, { correct: true });
    countriesOptions = countriesOptions.concat(correctCountry);
    console.log(countriesOptions);
    // Selects other resting options
    option = 0;
    while(option < totalOptions) {


      country = countriesOptions.find((country) => {
        if(this.props.params.movieId === movie.id.toString()) {
          return movie;
        }))
      if()
        option++;
      }
    }
  }
}
