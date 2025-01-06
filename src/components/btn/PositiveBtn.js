import React from 'react';

const PositiveBtn = (props) => {
  const btnPositiveStyle = {
    fontWeight: '700',
    color: 'white',
    textDecoration: 'none',
    padding: '.2em 1em calc(.2em + 3px)',
    borderRadius: '3px',
    background: 'rgb(0,0,0,30%)',
  };

  return (
    <div>
      <button onClick={props.func} style={btnPositiveStyle}>
        {props.text}
      </button>
    </div>
  );
};

export default PositiveBtn;
