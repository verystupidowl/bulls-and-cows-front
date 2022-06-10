import React, {useState} from 'react';

const Game = (props) => {

    const URL = "http://localhost:8080/game/";
    const [game, setGame] = useState('');
    const [answer, setAnswer] = useState('');
    const playerId = props.match.params.id;
    const id = game.id;
    const isGuessed = game.isGuessed;
    let i = 1;
    let cows = 0;
    let bulls = 0;
    let time = 0;

    const handleClickStartBtn = () => {
        const startBtn = document.getElementById('start-button');
        const submitBtn = document.getElementById('submit-btn');
        const input = document.getElementById('input');
        fetch(URL + "startGame" + playerId)
            .then(res => res.json()
                .then(result => setGame(result)))
            .then(() => console.log(game));
        startBtn.style.display = "none";
        submitBtn.style.display = "inline";
        input.style.display = "inline";
    };

    const handleSubmitBtnClick = (event) => {
        const submitBtn = document.getElementById('submit-btn');
        const backBtn = document.getElementById('back-btn');
        if (parseInt(answer) && parseInt(answer).toString().length === 4) {
            event.preventDefault();
            const step = {id, cows, bulls, answer, time};
            console.log(step);
            fetch(URL + "addStepToGame/" + playerId, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(step)
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
                {parseInt(isGuessed) === 1 ? 'ВЕРНО! Вы выиграли за ' + game.steps.length + ' попыток! Ответ: ' + game.rightAnswer
                    : 'Неверно попытка № ' + i}
            </h2>
            <br/>
            <br/>
            <form noValidate autoComplete="off">
                <input value={answer} onChange={event => setAnswer(event.target.value)} id="input"
                       style={{display: "none"}}/>
            </form>
            <button onClick={handleSubmitBtnClick} id="submit-btn" style={{display: "none"}}>
                Submit
            </button>

            <div id="back-btn" style={{display: "none"}}>
                <button onClick={() => window.location.assign("/menu/" + playerId)}>
                    Назад
                </button>
                <br/>
                <button onClick={() => window.location.assign("/game/" + playerId)}>
                    Играть снова
                </button>
            </div>
        </div>
    );
};

export default Game;