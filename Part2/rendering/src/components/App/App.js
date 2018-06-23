import React from 'react';
//import ReactDOM from 'react-dom';

import Kurssi from './Kurssi/Kurssi';


const app = () => {

  const otsikko = 'Opetusohjelma';

  const kurssit = [
      {
        nimi: 'Half Stack -sovelluskehitys',
        id: 1,
        osat: [
          {
            nimi: 'Reactin perusteet',
            tehtavia: 10,
            id: 1
          },
          {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7,
            id: 2
          },
          {
            nimi: 'Komponenttien tila',
            tehtavia: 14,
            id: 3
          },
        ]
      },
      {
        nimi: 'Middlewaret',
        id: 2,
        osat: [
          {
            nimi: 'Routing',
            tehtavia: 3,
            id: 1
          },
          {
            nimi: 'Middlewaret',
            tehtavia: 7,
            id: 2
          }
        ]
      }
    ]

  return (
    <div>
      <Kurssi
        kurssit={ kurssit }
        otsikko={ otsikko }
      />
    </div>
  )

}

export default app;
