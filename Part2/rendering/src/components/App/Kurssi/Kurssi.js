import React from 'react';
//import ReactDOM from 'react-dom';

import Otsikko from './Otsikko/Otsikko';
import Sisalto from './Sisalto/Sisalto';


const kurssi = (props) => {


  return (
    <div>
      <Otsikko otsikko={ props.otsikko } />
      <Sisalto kurssit= { props.kurssit } />
    </div>
  )

}

export default kurssi;
