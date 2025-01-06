import React, { useState, useEffect } from 'react';
import PositiveBtn from '../btn/PositiveBtn.js';
import NegativeBtn from '../btn/NegativeBtn.js';
import { BASE_URL } from '../common/Utils.js';
import '../style/Game.module.css';

const Tutor = (props) => {
  const playerId = props.match.params.id;
  const [error, setError] = useState('');

  const handleClickStartBtn = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/game/startGame`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      window.location.assign(`/game/${result.id}`);
    } catch (e) {
      setError(e.message || 'Error while starting game');
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <h4 className="error-message">{error}</h4>
        <NegativeBtn
          func={() => window.location.assign('/login')}
          text="Выйти"
        />
      </div>
    );
  }

  return (
    <div className="game-container">
      <div id="tutor" className="tutor">
        <h2>Игра "Быки - Коровы"</h2>
        <p>Компьютер загадывает число из 4 цифр, твоя задача - угадать!</p>
        <p>Как напишешь свой вариант, получишь число быков и коров</p>
        <p>Количество быков - количество цифр, которые ты угадал точно</p>
        <p>
          Количество коров - количество цифр, которые ты угадал, но не угадал
          позицию в числе
        </p>
      </div>

      <div id="start-button" className="start-button">
        <PositiveBtn func={handleClickStartBtn} text="Начать" />
      </div>

      <NegativeBtn func={() => window.location.assign(`/menu`)} text="Назад" />
    </div>
  );
};

export default Tutor;
