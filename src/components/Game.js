import React, {useState} from 'react';
import {useEffect} from "react";
import PositiveBtn from "./PositiveBtn";
import NegativeBtn from "./NegativeBtn";

const Game = (props) => {

    const URL = "http://localhost:8080/game/";
    const [game, setGame] = useState('');
    const [answer, setAnswer] = useState('');
    const playerId = props.match.params.id;
    const id = game.id;
    const isGuessed = game.isGuessed;
    const [errorMsg, setErrorMsg] = useState('');
    let [limitation, setLimitation] = useState('');
    let i = 1;
    let cows = 0;
    let bulls = 0;
    let time = 0;
    const [isStarted, setIsStarted] = useState(false);

    const inputStyle = {
        display: "inline",
        fontFamily: "inherit",
        fontSize: "1rem",
        fontWeight: "400",
        color: "#212529",
        backgroundColor: "#fff",
        backgroundClip: "padding-box",
        border: "1px solid #bdbdbd",
        borderRadius: "0.25rem",
    };


    useEffect(() => {
        fetch(URL + "getLimit" + playerId)
            .then(res => {
                if (res.status === 200) {
                    res.json().then(result => setLimitation(result));
                } else {
                    res.json().then(result => setErrorMsg(result));
                }
            }).then(() => {
                if (isStarted && parseInt(limitation) !== -2 && parseInt(limitation) !== -3 && parseInt(limitation) !== -100) {
                    const submitBtn = document.getElementById('submit-btn');
                    const backBtn = document.getElementById('back-btn');
                    if (limitation >= 0 && parseInt(isGuessed) === 0) {
                        if (submitBtn && backBtn) {
                            submitBtn.style.display = "inline";
                            backBtn.style.display = "none";
                        }
                        return '';
                    } else {
                        if (submitBtn && backBtn) {
                            submitBtn.style.display = "none";
                            backBtn.style.display = "inline";
                        }
                    }
                }
            }
        );
    });

    const handleClickStartBtn = () => {
        const startBtn = document.getElementById('start-button');
        const submitBtn = document.getElementById('submit-btn');
        const input = document.getElementById('input');
        const tutor = document.getElementById('tutor');
        fetch(URL + "startGame" + playerId)
            .then(res => res.json()
                .then(result => setGame(result)))
            .then(() => console.log(game));
        startBtn.style.display = "none";
        submitBtn.style.display = "inline";
        input.style.display = "inline";
        tutor.style.display = "none";
        setIsStarted(true);
    };

    const millisecondsToMinuteAndSeconds = (millis) => {
        if (game.limitation === 'TIME') {
            let minutes = Math.floor(millis / 60000);
            let seconds = ((millis % 60000) / 1000).toFixed(0);
            return 'Осталось: ' + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        } else if (game.limitation === 'STEPS') {
            return 'Осталось: ' + millis + ' попыток';
        } else if (game.limitation === 'WITHOUT') {
            return '';
        }
    };

    const handleSubmitBtnClick = (event) => {
        const submitBtn = document.getElementById('submit-btn');
        const backBtn = document.getElementById('back-btn');
        const input = document.getElementById('input');
        if (parseInt(answer) && parseInt(answer).toString().length === 4) {
            event.preventDefault();
            const step = {id, cows, bulls, answer, time};
            fetch(URL + "addStepToGame/" + playerId, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(step)
            }).then(res => res.json().then(result => {
                console.log(result);
                setGame(result);
                const trueOrFalse = document.getElementById('true-or-false');
                if ((parseInt(result.isGuessed)) === 1) {
                    submitBtn.style.display = "none";
                    backBtn.style.display = "inline";
                    input.style.display = "none";
                }
                trueOrFalse.style.display = "inline";
            }));
        }
    };

    const errorChecker = () => {
        if (parseInt(answer).toString().length === 4) {
            return '';
        } else {
            return 'Вы можете ввести только четырёхзначное число, которое не начинается на 0';
        }
    };

    if (errorMsg) {
        return (
            <div>
                <h4 style={{color: "red"}}>{errorMsg.message}</h4>
                <br/>
                <NegativeBtn func={() => window.location.assign("/login")} text="Выйти"/>
            </div>
        );
    }

    return (
        <div>
            <div id="tutor">
                <h2 color="blue">Игра "Быки - Коровы"</h2>
                <h4>Правила простные: </h4>
                <h4>Компьютер загадывает число из 4 цифр, твоя задача - угадать!</h4>
                <h4>Как напишешь свой вариант, получишь число быков и коров</h4>
                <h4>Количество быков - количество цифр, которые ты угадал точно</h4>
                <h4>Количество коров - количество цифр, которые ты угадал, но не угадал позицию в числе</h4>
            </div>
            <br/>
            <br/>
            <div id="start-button">
                <PositiveBtn func={handleClickStartBtn} text="Начать"/>
            </div>
            <br/>
            {game.steps?.map(step => <div key={step.id}>
                <h2 id="bulls-and-cows-count">
                    {i++ + ') Быки: ' + step.bulls + ' Коровы: ' + step.cows + ', твой ответ: ' + step.answer}
                </h2>
            </div>)}
            <h2 id="true-or-false" style={{display: "none"}}>
                {parseInt(isGuessed) === 1 ? 'ВЕРНО! Вы выиграли за ' + game.steps.length + ' попыток! Ответ: ' + game.rightAnswer
                    : 'Неверно! Попытка № ' + i}
            </h2>
            <div id="input" style={{display: "none"}}>
                <h2 style={{color: "blue"}}>Число загадано!</h2>
                <h2 style={{color: "red"}}>{(limitation > 0 || (parseInt(limitation) === -2 || parseInt(limitation) === -3 || parseInt(limitation) === -100))
                && parseInt(isGuessed) === 0 ? millisecondsToMinuteAndSeconds(limitation) : 'Ты не успел!'}</h2>
                <div style={{color: "red"}}>
                    {errorChecker()}
                </div>
                <form noValidate autoComplete="off">
                    <input value={answer} style={inputStyle} onChange={event => setAnswer(event.target.value)}/>
                </form>
            </div>
            <br/>
            <div style={{display: "none"}} id="submit-btn">
                <PositiveBtn func={handleSubmitBtnClick} text="Submit"/>
            </div>
            <div id="back-btn" style={{display: "none"}}>
                <PositiveBtn func={() => window.location.assign("/game/" + playerId)} text="играть снова"/>
                <br/>
                <NegativeBtn func={() => window.location.assign("/menu/" + playerId)} text="Назад"/>
            </div>
        </div>
    );
};

export default Game;