import React from 'react';

const NegativeBtn = (props) => {
  const btnNegativeStyle = {
    fontWeight: '700',
    color: 'white',
    textDecoration: 'none',
    padding: '.2em 1em calc(.2em + 3px)',
    borderRadius: '3px',
    background: 'rgb(199,64,64)',
  };

  return (
    <div>
      <button onClick={props.func} style={btnNegativeStyle}>
        {props.text}
      </button>
    </div>
  );
};

export default NegativeBtn;
