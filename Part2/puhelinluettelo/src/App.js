import React from 'react';

import Filtering from './components/Filtering/Filtering';
import NewPerson from './components/NewPerson/NewPerson';
import OnePerson from './components/OnePerson/OnePerson';
import Notification from './components/Notification/Notification';
import classes from './App.css';
import personService from './services/persons';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      filtered: [],
      note: null
    }
  }

 componentDidMount = () => {

   personService
    .getPersons()
       .then(response => {
           const dbPersons = response.data;
           this.setState({ persons: dbPersons });
       })
  }

  addNameHandler = (event) => {
    this.setState({ newName: event.target.value });
  }

  addNumberHandler = (event) => {
    this.setState({ newNumber: event.target.value });
  }

  choicePersonHandler = (event) => {
    this.setState({ filter: event.target.value });

    const filtered = this.state.persons.filter( person => person.name.toUpperCase().includes(event.target.value.toUpperCase()));
    this.setState({ filtered: filtered });
  }

  addNewPerson = (event) => {
    event.preventDefault();
    let found = false;
    let id = '';
    let name = this.state.newName;
    let number = this.state.newNumber;
    let updatedPersonsObject = {};
    let replacedPerson = false;

    this.state.persons.forEach( function( person ) {
      if( person.name === name ) {
        found = true;
        const searchResult = window.confirm(`${name} on jo luettelossa. Korvataanko vanha numero uudella?`);

        if(searchResult) {
          id = person.id;
          replacedPerson = true;

          updatedPersonsObject = {
            name: person.name,
            number: number,
            id: person.id
          }
        }
        //alert("Nimi löytyy jo puhelinluettelosta!");
      }
    })

    if( !found ) {

      let arrayLength = this.state.persons.length;
      let lastPerson = arrayLength - 1;
      let lastPersonId = this.state.persons[lastPerson].id;
      let newId = lastPersonId + 1;

      const personsObject = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: newId
      }

      this.state.persons.push(personsObject);
      const appPersons = this.state.persons;
      const persons = personsObject;

      let filteredPersonsAgain = [];
      if( this.state.filter !== '' ) {
        filteredPersonsAgain = appPersons.filter( person => person.name.toUpperCase().includes(this.state.filter.toUpperCase()));
      }

      /*Saving updated persons object into the server*/
      personService
         .addPerson(persons)
             .then(response => {
               this.setState({
                 persons: appPersons,
                 newName: '',
                 newNumber: '',
                 note: `Lisättiin '${this.state.newName}'`,
                 filtered: filteredPersonsAgain
               })
               setTimeout(() => {
                 this.setState({ note: null })
               }, 3000)
         })
    }
    else if( replacedPerson ) {
      personService
         .updatePerson(id, updatedPersonsObject)
             .then(response => {
               this.setState({
                 persons: this.state.persons.map(person => person.id !== id ? person : updatedPersonsObject),
                 newName: '',
                 newNumber: '',
                 note: this.state.persons.map(person => person.id === id ? `Muutettiin henkilön '${person.name}' numeroa` : null)
               })
               setTimeout(() => {
                 this.setState({ note: null })
               }, 3000)
             })

             .catch(error => {
               /*Added person again because person was already removed*/
               const updatedPersonsArray = this.state.persons.filter(n => n.id !== id);
               let personsLength = updatedPersonsArray.length;
               let lastPson = personsLength - 1;
               let lastPersonID = updatedPersonsArray[lastPson].id;
               let newPersonId = lastPersonID + 1;

               const newPersonsObject = {
                 name: this.state.newName,
                 number: this.state.newNumber,
                 id: newPersonId
               }

               updatedPersonsArray.push(newPersonsObject);

               let filterAgain = [];
               if( this.state.filter !== '' ) {
                 filterAgain = updatedPersonsArray.filter( person => person.name.toUpperCase().includes(this.state.filter.toUpperCase()));
               }

               personService
                  .addPerson(newPersonsObject)
                      .then(response => {

                        this.setState({
                          persons: updatedPersonsArray,
                          newName: '',
                          newNumber: '',
                          note: `Lisättiin '${this.state.newName}' uudelleen, koska henkilö olikin jo poistettu luettelosta.`,
                          filtered: filterAgain
                        })

                        setTimeout(() => {
                          this.setState({ note: null })
                        }, 3000)
                  })

             })
    }

  }

  deletePerson =(id, name) => {
    const result = window.confirm(`Poistetaanko ${name}?`);

    if (result) {
     personService
      .delPerson(id)
         .then(response => {
             const newPersons = this.state.persons.filter(n => n.id !== id);

             let filteredAgain = [];
             if( this.state.filter !== '' ) {
               filteredAgain = newPersons.filter( person => person.name.toUpperCase().includes(this.state.filter.toUpperCase()));
             }

             this.setState({
                 persons: newPersons,
                 note: `Poistettiin '${name}'`,
                 filtered: filteredAgain
             })

             setTimeout(() => {
               this.setState({ note: null })
             }, 3000)
         })
      }
  }


  render() {
    return (
      <div className="AppContainer">
        <h2>Puhelinluettelo</h2>

        <Notification message={this.state.note}/>

        <Filtering
           text="rajaa näytettäviä: "
           filterValue={ this.state.filter }
           change={ this.choicePersonHandler }
         /><br/>

        <NewPerson
          submit={ this.addNewPerson }
          name={ this.state.newName}
          number={ this.state.newNumber }
          addName={ this.addNameHandler }
          addNumber={ this.addNumberHandler }
        />

        <h2>Numerot</h2>
         <OnePerson
             persons={ this.state.filtered }
             clicked={ (id, name) => this.deletePerson(id, name) }
         />
      </div>
    );
  }
}

export default App;
