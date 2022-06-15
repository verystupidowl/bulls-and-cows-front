import React, {useEffect, useState} from 'react';

const Menu = (props) => {
    const id = props.match.params.id;
    const [player, setPlayer] = useState('');
    const URL = "http://localhost:8080/game/";

    const btnStyle = {
        fontWeight: "700",
        color: "white",
        textDecoration: "none",
        padding: ".2em 1em calc(.2em + 3px)",
        borderRadius: "3px",
        background: "rgb(64,199,129)",
    };

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
            <button style={btnStyle} onClick={() => window.location.assign("/game/" + player.id)}>
                Играть
            </button>
            <button style={btnStyle} onClick={() => window.location.assign("/statistic/" + player.id)}>
                Статистика
            </button>
            <br/>
            <button style={btnStyle} onClick={() => window.location.assign("/login")}>
                Выход
            </button>
        </div>
    );
};

export default Menu;