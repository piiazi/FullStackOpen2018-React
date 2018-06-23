import React from 'react';
//import ReactDOM from 'react-dom';

import Osa from './Osa/Osa';


const sisalto = (props) => {

  return (
    <div>
      { props.kurssit.map( (kurssi, index) => {
        return <Osa key={ kurssi.id } kurssi={ kurssi.nimi } osat={ kurssi.osat } />;
      })}
    </div>
  );
}


export default sisalto;
