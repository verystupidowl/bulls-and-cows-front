import React, {useEffect, useState} from 'react';
import PositiveBtn from "./PositiveBtn";
import NegativeBtn from "./NegativeBtn";

const Statistic = (props) => {

    const id = props.match.params.id;
    const URL = "http://localhost:8080/game/";
    const [player, setPlayer] = useState('');
    const [error, setError] = useState('');
    let i = 1;

    useEffect(() => {
        fetch(URL + "getPlayer" + id)
            .then(res => {
                if (res.status === 200) {
                    res.json().then(result => setPlayer(result));
                } else {
                    res.json().then(result => setError(result));
                }
            }).then(() => console.log(player));
    }, [id, player]);

    const games = player.games;

    const millisecondsToMinuteAndSeconds = (millis) => {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };

    if (player.games?.length === 0) {
        return (
            <div>
                <h2>{player.name}, у тебя еще нет игр</h2>
                <br/>
                <br/>
                <PositiveBtn func={() => window.location.assign("/menu/" + id)} text="В меню"/>
            </div>
        );
    }

    const getLimitationNames = (limitation) => {
        switch (limitation) {
            case "TIME":
                return 'по времени';
            case "STEPS":
                return 'по попыткам';
            default:
                return 'без ограничений';
        }
    };

    if (error) {
        return (
            <div>
                <h4 style={{color: "red"}}>{error.message}</h4>
                <br/>
                <PositiveBtn func={() => window.location.assign("/login")} text="Выйти"/>
            </div>
        );
    }

    return (
        <div>
            <h2>{player.name}, твоя статистика:</h2>
            <br/>
            <br/>
            <h2>Твои игры:</h2>
            {games?.map(game => (
                <div key={game.id}>
                    {game.steps.length > 0 ?
                        <div>{i++})
                            Время: {millisecondsToMinuteAndSeconds(game.steps[game.steps.length - 1]?.time - game.startTime)};
                            Попыток: {game.steps.length};
                            Правильный ответ
                            был: {game.rightAnswer};
                            Ограничение: {getLimitationNames(game.limitation)};
                            Угадано: {parseInt(game.isGuessed) === 1 ? 'да' : 'нет'}
                            <br/>
                        </div>
                        : ''
                    }
                </div>
            ))}
            <br/>
            <NegativeBtn func={() => window.location.assign("/menu/" + id)} text="В меню"/>
        </div>
    );
};

export default Statistic;