import React from 'react';

const Menu = (props) => {
    const id = props.match.params.id;
    return (
        <div>
            {id}
        </div>
    );
};

export default Menu;