import React from 'react';

import classes from './Button.css';


const button = (props) => (

  <button className="AnecdoteButton" onClick={ props.buttonClick }>
    { props.buttonText }
  </button>

);

export default button;
