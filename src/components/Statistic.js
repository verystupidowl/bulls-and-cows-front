import React, {useEffect, useState} from 'react';

const Statistic = (props) => {

    const id = props.match.params.id;
    const URL = "http://localhost:8080/game/";
    const [player, setPlayer] = useState('');
    let i = 1;
    let time = 0;

    useEffect(() => {
        fetch(URL + "getPlayer" + id)
            .then(res => res.json().then(result => setPlayer(result))).then(() => console.log(player))
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
                    <div>{i++}) Время: {game.steps?.map(step => time += step.time, <div key={id}>time</div>)};
                        Попыток: {game.steps.length};
                        Правильный ответ
                        был: {game.rightAnswer}</div>
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