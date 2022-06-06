import React, {useState} from 'react';

const Game = (props) => {

        const URL = "http://localhost:8080/game/";
        const [game, setGame] = useState('');
        const [answer, setAnswer] = useState('');
        const playerId = props.match.params.id;
        const rightAnswer = game.answer;
        let stepCount = game.stepCount;
        const time = game.time;
        const id = game.id;
        const isGuessed = game.isGuessed;

        const handleClick = () => {
            const startBtn = document.getElementById('start-button');
            const submitBtn = document.getElementById('submit-btn');
            const input = document.getElementById('input');
            fetch(URL + "startGame" + playerId)
                .then(res => res.json()
                    .then(result => setGame(result)))
                .then(() => console.log(game))
            startBtn.style.display = "none";
            submitBtn.style.display = "inline";
            input.style.display = "inline";
        };

        const handleSubmitBtnClick = (event) => {
            if (parseInt(answer)) {
                event.preventDefault();
                const game = {id, stepCount, time, answer, isGuessed};
                console.log(game);
                fetch(URL + "addStepToGame/" + playerId, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(game)
                }).then(res => res.json().then(result => setGame(result))).then(() => console.log(game))
            } else
                console.log("nope")
        }

        return (
            <div>
                <button onClick={handleClick} id="start-button">
                    Начать
                </button>
                <h2>{rightAnswer}</h2>
                <br/>
                <form noValidate autoComplete="off">
                    <input value={answer} onChange={event => setAnswer(event.target.value)} id="input"
                           style={{display: "none"}}/>
                </form>
                <button onClick={handleSubmitBtnClick} id="submit-btn" style={{display: "none"}}>
                    Submit
                </button>
                <br/>
                <h2>{parseInt(isGuessed) === 1 ? 'ВЕРНО' : 'Неверно'}</h2>
            </div>
        );
    }
;

export default Game;