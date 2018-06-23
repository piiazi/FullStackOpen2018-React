import React from 'react';
//import ReactDOM from 'react-dom';

import Yhteensa from '../../Yhteensa/Yhteensa';


const osa = (props) => {

  return (
    <div>
      <h1> { props.kurssi } </h1>
      { props.osat.map( osa => {
        return (
            <p key={ osa.id }>{ osa.nimi } { osa.tehtavia }</p>
        )
      })}
      <Yhteensa osat= { props.osat } />
    </div>
  );
}

export default osa;
