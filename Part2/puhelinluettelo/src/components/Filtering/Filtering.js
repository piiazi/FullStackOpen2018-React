import React from 'react';

const filtering = (props) => {

  return (
    <div>
      { props.text }
      <input
          value={ props.filterValue }
          onChange={ props.change }
      />
    </div>
  );

}

export default filtering;
