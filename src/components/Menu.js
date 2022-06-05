import React, {useEffect, useState} from 'react';

const Menu = (props) => {
    const id = props.match.params.id;
    const [player, setPlayer] = useState('');
    const URL = "http://localhost:8080/game/";
    useEffect(() => {
        fetch(URL + "getPlayer" + id)
            .then(res => res.json()
                .then(result => setPlayer(result))
            ).then(() => console.log(player))
    })

    return (
        <div>
            <h2>Привет, {player.name}!</h2>
            <br/>
            <br/>
            <button onClick={() => window.location.assign("/game/" + player.id)}>
                Играть
            </button>
            <button onClick={() => window.location.assign("/statistic/" + player.id)}>
                Статистика
            </button>
        </div>
    );
};

export default Menu;