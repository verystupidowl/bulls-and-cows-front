import React, {useState} from 'react';

const Game = (props) => {

        const URL = "http://localhost:8080/game/";
        const [game, setGame] = useState('');
        const [rightAnswer, setRightAnswer] = useState('');
        const playerId = props.match.params.id;
        let stepCount = game.stepCount;
        const time = game.time;
        const id = game.id;
        const isGuessed = game.isGuessed;
        let i = 1;

        const handleClickStartBtn = () => {
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
            const submitBtn = document.getElementById('submit-btn');
            const backBtn = document.getElementById('back-btn');
            if (parseInt(rightAnswer) && parseInt(rightAnswer).toString().length === 4) {
                event.preventDefault();
                const game = {id, stepCount, time, rightAnswer, isGuessed};
                console.log(game);
                fetch(URL + "addStepToGame/" + playerId, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(game)
                }).then(res => res.json().then(result => {
                    console.log(result)
                    setGame(result)
                    const trueOrFalse = document.getElementById('true-or-false');
                    if ((parseInt(result.isGuessed)) === 1) {
                        submitBtn.style.display = "none";
                        backBtn.style.display = "inline";
                    }
                    trueOrFalse.style.display = "inline";
                }))
            } else
                console.log("nope")
        }

        return (
            <div>
                <button onClick={handleClickStartBtn} id="start-button">
                    Начать
                </button>
                <br/>
                {game.steps?.map(step => <div key={step.id}>
                    <h2 id='is-right'>
                        {i++ + ') Быки: ' + step.bulls + ' Коровы: ' + step.cows + ', твой ответ: ' + step.answer}
                    </h2>
                </div>)}
                <h2 id="true-or-false" style={{display: "none"}}>
                    {parseInt(isGuessed) === 1 ? 'ВЕРНО! Вы выиграли за ' + stepCount + ' попыток! Ответ: ' + game.rightAnswer
                        : 'Неверно попытка № ' + (game.stepCount)}
                </h2>
                <br/>
                <br/>
                <form noValidate autoComplete="off">
                    <input value={rightAnswer} onChange={event => setRightAnswer(event.target.value)} id="input"
                           style={{display: "none"}}/>
                </form>
                <button onClick={handleSubmitBtnClick} id="submit-btn" style={{display: "none"}}>
                    Submit
                </button>

                <button onClick={() => window.location.assign("/menu/" + playerId)} id="back-btn" style={{display: "none"}}>
                    Назад
                </button>
            </div>
        );
    }
;

export default Game;