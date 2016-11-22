export default {
  countriesJSON: [],
  countriesOptions: [],

  getCountriesOptions: () => {
    // If the storage object hasn't already been populated, we call the API and store the array in sessionStorage
    if(!sessionStorage.getItem("countries")) {
      fetch("http://api.geonames.org/countryInfoJSON?username=julian.aiup")
        .then((response) => {
          return response.json()
        })
        .then((countries) => {
          // Save countries to sessionStorage
          sessionStorage.setItem("countries", JSON.stringify(countries.geonames));
        }).then(() => {
          return this.selectCountries();
        });
    }
    // If the storage object has already been populated, we only select the countries from sessionStorage
    return this.selectCountries();
  },

  selectCountries: () => {
    this.countriesJSON = JSON.parse(sessionStorage.getItem("countries"));
    this.countriesOptions = selectCorrectCountry();
    this.countriesOptions = selectIncorrectCountries();
    return this.countriesOptions;
  },

  selectCorrectCountry: () => {
    // Selects correct country randomly (between 0 and the quantity of countries)
    let correctCountryPosition = Math.floor(Math.random() * this.countriesJSON.length);
    // Select country from correctCountryPosition and store country info in variable
    let correctCountryInfo = this.countriesJSON[correctCountryPosition];
    // Create the correct country option and add it to the array
    let correctCountryOption = Object.assign(
      {},
      { position: correctCountryPosition },
      { info: correctCountryInfo },
      { correct: true }
    );
    return this.countriesOptions.concat(correctCountryOption);
  },

  selectIncorrectCountries: () => {
    // Selects other incorrect options
    const TOTAL_OPTIONS = 3;
    let option = 0;
    let incorrectCountryPosition;
    let indexCountry;
    let incorrectCountryInfo;
    let incorrectCountryOption;
    while(option < TOTAL_OPTIONS) {
      incorrectCountryPosition = Math.floor(Math.random() * this.countriesJSON.length);
      // Equals -1 when isn't already selected
      indexCountry = this.countriesOptions.findIndex((arrayCountry) => {
          return incorrectCountryPosition === arrayCountry.position
        }
      );
      if(indexCountry === -1) {
        // Create a new incorrect country option and add it to the array
        incorrectCountryInfo = this.countriesJSON[incorrectCountryPosition];
        incorrectCountryOption = Object.assign(
          {},
          { position: incorrectCountryPosition },
          { info: incorrectCountryInfo },
          { correct: false }
        );
        countriesOptions = this.countriesOptions.concat(incorrectCountryOption);
        option++;
      }
    }
    return this.countriesOptions;
  }
}
