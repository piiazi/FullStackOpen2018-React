import React from 'react';
//import ReactDOM from 'react-dom';


const yhteensa = (props) => {

  let sum = 0;

  const summa = props.osat.reduce(function(accumulator, currentValue) {

      let accum = accumulator.tehtavia;
      let curr = currentValue.tehtavia;
      if( accum ) {
        sum = accum + curr;
      }
      else  {
        sum += curr;
      }
      return sum;
  });

  return (
    <div>
        <p>yhteensä { summa } tehtävää </p>
    </div>
  )
}

export default yhteensa;
