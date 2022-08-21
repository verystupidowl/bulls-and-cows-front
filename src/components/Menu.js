import React, {useEffect, useState} from 'react';
import NegativeBtn from "./NegativeBtn";
import PositiveBtn from "./PositiveBtn";

const Menu = (props) => {
    const id = props.match.params.id;
    const [player, setPlayer] = useState('');
    const [error, setError] = useState('');
    const URL = "http://localhost:8080/game/";

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
                <h4 style={{color:"red"}}>{error.message}</h4>
                <NegativeBtn func={() => window.location.assign("/login")} text="Выйти"/>
            </div>
        )
    }

    return (
        <div>
            <h2>Привет, {player.name}!</h2>
            <br/>
            <br/>
            <PositiveBtn func={() => window.location.assign("/game/" + player.id)} text="Играть"/>
            <PositiveBtn func={() => window.location.assign("/statistic/" + player.id)} text="Статистика"/>
            <br/>
            <NegativeBtn func={() => window.location.assign("/login")} text="Выход"/>
        </div>
    );
};

export default Menu;