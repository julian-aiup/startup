export function getCountriesOptions() {
  // If the storage object hasn't already been populated
  if(!sessionStorage.getItem("countries")) {
    getCountriesFromAPI();
  }
  JSON.parse(sessionStorage.getItem("countries"));
  return (selectCountries());
}

function getCountriesFromAPI() {
  fetch("http://api.geonames.org/countryInfoJSON?username=julian.aiup")
    .then((response) => {
      return response.json()
    })
    .then((countries) => {
      // Save countries to sessionStorage
      sessionStorage.setItem("countries", JSON.stringify(countries.geonames));
    });
}

function selectCountries() {
  let countriesJSON = JSON.parse(sessionStorage.getItem("countries"));
  let countriesOptions = [];
  countriesOptions = selectCorrectCountry(countriesJSON, countriesOptions);
  countriesOptions = selectIncorrectCountries(countriesJSON, countriesOptions);
  return countriesOptions;
}

function selectCorrectCountry(countriesJSON, countriesOptions) {
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

function selectIncorrectCountries(countriesJSON, countriesOptions) {
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
    indexCountry = countriesOptions.findIndex((arrayCountry) => {
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
