import React from 'react';


const statistic = (props) => {

  return (
    <tbody>
      <tr>
        <td> { props.name } </td>
        <td> { props.value } { props.unit }</td>
      </tr>
    </tbody>
  )
}

export default statistic;
