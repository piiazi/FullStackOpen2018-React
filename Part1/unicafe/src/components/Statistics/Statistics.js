import React from 'react';

//import classes from './Statistics.css';
import Statistic from './Statistic/Statistic';


const statistics = (props) => {

  return (
    <table>


      { props.allOpinions.map( (oneOpinion, ind) => {
          return (
            <Statistic key={ oneOpinion + ind  } name={ oneOpinion.name } value={ oneOpinion.count } unit="" />
          )
      })}
      <Statistic name="keskiarvo" value={ props.average } unit="" />
      <Statistic name="positiivisia" value={ props.positiveValues } unit="%" />
    </table>

  )
}

export default statistics;
