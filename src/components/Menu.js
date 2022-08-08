import React, {useEffect, useState} from 'react';

const Menu = (props) => {
    const id = props.match.params.id;
    const [player, setPlayer] = useState('');
    const [error, setError] = useState('');
    const URL = "http://localhost:8080/game/";

    const btnStyle = {
        fontWeight: "700",
        color: "white",
        textDecoration: "none",
        padding: ".2em 1em calc(.2em + 3px)",
        borderRadius: "3px",
        background: "rgb(0,0,0,30%)"
    };

    const btnNegativeStyle = {
        fontWeight: "700",
        color: "white",
        textDecoration: "none",
        padding: ".2em 1em calc(.2em + 3px)",
        borderRadius: "3px",
        background: "rgb(199,64,64)",
    };

    useEffect(() => {
        fetch(URL + "getPlayer" + id)
            .then(res => {
                    if (res.status === 200) {
                        res.json().then(result => setPlayer(result));
                    } else {
                        res.json().then(result => setError(result));
                    }
                }
            ).then(() => console.log(player))
    });

    if (error) {
        return (
            <div>
                {error.message}
            </div>
        )
    }

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
            <button style={btnNegativeStyle} onClick={() => window.location.assign("/login")}>
                Выход
            </button>
        </div>
    );
};

export default Menu;