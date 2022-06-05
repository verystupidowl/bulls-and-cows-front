import React from 'react';

const Game = (props) => {
    return (
        <div>
            <h2>{props.match.params.id}</h2>
        </div>
    );
};

export default Game;