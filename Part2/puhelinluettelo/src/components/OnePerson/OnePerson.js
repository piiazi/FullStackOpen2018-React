import React from 'react';

import classes from './OnePerson.css';

const onePerson = (props) => {

  return (
    props.persons.map( person => {
       return (
         <div key={ person.name }>
             { person.name } { person.number }
             <button onClick={ (event) =>props.clicked( person.id, person.name, event ) } className="OnePersonButton"> Poista </button>
         </div>
       );
    })
  );

}

export default onePerson;
