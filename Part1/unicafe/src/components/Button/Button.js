import React from 'react';

import classes from './Button.css';


const button = (props) => {

  return (
    <button className="Button" onClick={ props.clicked }>
      { props.buttonText }
    </button>

  )
}

export default button;
