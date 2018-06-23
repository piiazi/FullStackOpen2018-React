import React, { Component } from 'react';
import axios from 'axios';

import classes from './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      chosenCountry: "",
      foundCountries: [],
      onlyOne: false,
    }
  }

 componentDidMount = () => {
      axios
         .get('https://restcountries.eu/rest/v2/all')
         .then(response => {
             const dbCountries = response.data;
             console.log(dbCountries);
             this.setState({ countries: dbCountries });
         })

      this.setState({ foundCountries: [] });
  }

  findCoutriesHandler = ( event ) => {
    this.setState({ chosenCountry: event.target.value });
    console.log(event.target.value);

    const filtered = this.state.countries.filter( country => country.name.toUpperCase().includes(event.target.value.toUpperCase()));
    console.log(filtered);
    this.showCountries( filtered );
  }

  showCountries = ( countries ) => {

    let tempCountries = this.state.foundCountries;

    if( countries.length > 10 ) {
      tempCountries = [{ name: "Too many matches, specify another filter!" }];
      this.setState({ foundCountries: tempCountries });
      this.setState({ onlyOne: false });
    }
    else if ( countries.length > 1 ) {

        let countriesData = countries.map( country => {
           return (
             { name: country.name }
           );
        });

        tempCountries = countriesData;
        console.log(tempCountries);
        this.setState({ foundCountries: tempCountries });
        this.setState({ onlyOne: false });
    }
    else if ( countries.length === 1 ) {
      this.setState({ onlyOne: true });
      tempCountries = countries;
      this.setState({ foundCountries: tempCountries });
    }

  }

  countryClickHandler = (event) => {
     event.preventDefault();
     //this.setState({ onlyOne: true });

     let clickedCountry = event.target.textContent;
     console.log(clickedCountry);
     let trimmedClickedCountry = clickedCountry.trim();

     const filteredCountry = this.state.countries.filter( country => country.name.toUpperCase().includes(trimmedClickedCountry.toUpperCase() ));
     console.log(filteredCountry);

     this.showCountries( filteredCountry );     
  }


  render() {
    return (
      <div className="App">

        <div className="FindCountries">
            <span className="FindCountriesInfoText">Find countries: </span>
            <input
               value={ this.state.chosenCountry }
               onChange={ this.findCoutriesHandler }
            />
            <div className="FindCountriesResult">
                { this.state.foundCountries.map( ( country, index ) => {

                    return (
                     this.state.onlyOne ?
                          <p className="CountryNames" key={ index + 'x' }> { country.name } { country.nativeName} <br/>
                          <span className="CountryDetails"> Capital: { country.capital } <br/>
                          Population: { country.population } <br />
                          <img className="CountryFlag" src={ country.flag } alt="Flag of the country" />
                          </span></p>

                    :
                          <p onClick={ this.countryClickHandler.bind(this) } key={ index + 'x' }> { country.name } </p>
                  );

                })}
            </div>
        </div>

      </div>
    );
  }
}

export default App;
