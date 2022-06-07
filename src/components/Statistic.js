import React, {useEffect, useState} from 'react';

const Statistic = (props) => {

    const id = props.match.params.id;
    const URL = "http://localhost:8080/game/";
    const [player, setPlayer] = useState('');
    let i = 1;

    useEffect(() => {
        fetch(URL + "getPlayer" + id)
            .then(res => res.json().then(result => setPlayer(result)))
    }, [id, player]);
    const games = player.games;

    if (player.games?.length === 0) {
        return (
            <div>
                <h2>{player.name}, у тебя еще нет игр</h2>
                <br/>
                <br/>
                <button onClick={() => window.location.assign("/menu/" + id)}>
                    В меню
                </button>
            </div>
        )
    }

    return (
        <div>
            <h2>{player.name}, твоя статистика:</h2>
            <br/>
            <br/>
            <p>Твои игры:</p>
            {games?.map(game => (
                <div key={game.id}>
                    <p>{i++}) Время: {game.time}; Попыток: {game.stepCount}; Правильный ответ
                        был: {game.rightAnswer}</p>
                    <br/>
                </div>
            ))}
            <button onClick={() => window.location.assign("/menu/" + id)}>
                В меню
            </button>
        </div>
    );
};

export default Statistic;