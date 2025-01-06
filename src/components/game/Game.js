import React, { useState, useEffect } from 'react';
import PositiveBtn from '../btn/PositiveBtn.js';
import NegativeBtn from '../btn/NegativeBtn.js';
import { BASE_URL } from '../common/Utils.js';
import '../style/Game.module.css';

const Game = (props) => {
  const [answer, setAnswer] = useState('');
  const [isEnded, setIsEnded] = useState(false);
  const [error, setError] = useState('');
  const [limitation, setLimitation] = useState({});
  const [game, setGame] = useState(null);
  const [isGuessed, setIsGuessed] = useState(false);
  const gameId = props.match.params.id;
  let i = 1;

  useEffect(() => {
    const fetchGame = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/game/getGame/${gameId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const result = await res.json();
        setGame(result);
        setIsGuessed(result.guessed);
        console.log(game);
      } else if (res.status === 404) {
        const err = await res.json();
        setError(err.message);
      }
    };
    if (!error) {
      fetchGame();
      fetchLimit();

      let intervalId;

      if (limitation?.code === 'TIME') {
        intervalId = setInterval(fetchLimit, 1000);
      }

      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, [limitation, gameId]);

  const millisecondsToMinuteAndSeconds = (limit) => {
    switch (limitation.code) {
      case 'TIME':
        if (limit.value.toString().length === 2) {
          return 'Осталось: 0:' + limit.value;
        }
        return 'Осталось: 0:0' + limit.value;
      case 'STEPS':
        return 'Осталось: ' + limit.value;
      case 'WITHOUT':
        return '';
    }
  };

  const fetchLimit = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${BASE_URL}/game/getLimit/${gameId}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      setLimitation(result);
      setIsEnded(result.isEnded);
    } catch (e) {
      setError(e.message || 'Error while getting limits');
    }
  };

  const handleSubmitBtnClick = async (event) => {
    if (parseInt(answer) && parseInt(answer).toString().length === 4) {
      event.preventDefault();
      const step = { answer };
      const token = localStorage.getItem('token');
      await fetch(`${BASE_URL}/step/addStepToGame/${gameId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(step),
      });
      fetchLimit();
    }
  };

  const errorChecker = () => {
    if (parseInt(answer).toString().length === 4) {
      return '';
    }
    return 'Вы можете ввести только четырёхзначное число, которое не начинается на 0';
  };

  if (error) {
    return (
      <div className="error-container">
        <h4 className="error-message">{error}</h4>
        <NegativeBtn
          func={() => window.location.assign('/menu')}
          text="Выйти"
        />
      </div>
    );
  }

  return (
    <div className="game-container">
      {game?.steps?.map((step) => (
        <div key={step.id} className="step">
          <h2>
            {i++}) Быки: {step.answerBullsAndCows.bulls} Коровы:{' '}
            {step.answerBullsAndCows.cows}, твой ответ: {step.answer}
          </h2>
        </div>
      ))}

      <h2 id="true-or-false" className="result-message">
        {isGuessed
          ? `ВЕРНО! Вы выиграли за ${game.steps.length} попыток!`
          : isEnded
          ? `Вы не угадали, правильный ответ ${game.rightAnswer}`
          : `Неверно! Попытка № ${i}`}
      </h2>

      <div
        id="input"
        className="input-container"
        style={{ display: isEnded ? 'none' : 'inline' }}
      >
        <h2 className="game-status">
          {game?.steps?.length > 0 ? '' : 'Число загадано!'}
        </h2>
        <h2 className="game-status">
          {!isEnded ? millisecondsToMinuteAndSeconds(limitation) : ''}
        </h2>
        <div className="error-checker">{errorChecker()}</div>
        <form noValidate autoComplete="off">
          <input
            value={answer}
            className="answer-input"
            onChange={(event) => setAnswer(event.target.value)}
          />
        </form>
      </div>

      <div
        id="submit-btn"
        className="submit-btn"
        style={{ display: isEnded || isGuessed ? 'none' : 'inline' }}
      >
        <PositiveBtn func={handleSubmitBtnClick} text="Submit" />
      </div>

      <div
        id="back-btn"
        className="back-btn"
        style={{ display: isEnded || isGuessed ? 'inline' : 'none' }}
      >
        <PositiveBtn
          func={() => window.location.assign(`/tutor`)}
          text="играть снова"
        />
      </div>
      <NegativeBtn func={() => window.location.assign(`/menu`)} text="Назад" />
    </div>
  );
};

export default Game;
