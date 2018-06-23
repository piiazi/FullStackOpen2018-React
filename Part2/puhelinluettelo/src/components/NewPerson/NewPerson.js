import React from 'react';

import classes from './NewPerson.css';

const newPerson = (props) => {

  return (

    <form onSubmit={ props.submit }>
      <div className="NewPersonField">
        nimi:
        <input
            className="NewPersonInputField"
            value={ props.name }
            onChange={ props.addName }
        />
      </div>
      <div className="NewPersonField">
        numero:
        <input
           className="NewPersonInputField"
           value={ props.number }
           onChange={ props.addNumber }
        />
      </div>
      <div className="NewPersonField">
        <button type="submit">lisää</button>
      </div>
    </form>

  );

}

export default newPerson;
