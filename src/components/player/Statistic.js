import React, { useEffect, useState } from 'react';
import PositiveBtn from '../btn/PositiveBtn';
import NegativeBtn from '../btn/NegativeBtn';
import { BASE_URL } from '../common/Utils';
import styles from '../style/Statistic.module.css';

const Statistic = (props) => {
  const id = props.match.params.id;
  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(BASE_URL + '/game/getAllGames', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        setGames(result);
        console.log(result);
      } catch (e) {
        setError(e.message || 'Error while fetching games');
      }
    };
    fetchGames();
  }, [id]);

  const millisecondsToMinuteAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = Math.floor((millis % 60000) / 1000);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  const getLimitationNames = (limitation) => {
    switch (limitation) {
      case 'TIME':
        return 'по времени';
      case 'STEPS':
        return 'по попыткам';
      default:
        return 'без ограничений';
    }
  };

  if (error) {
    return (
      <div className={styles.statisticContainer}>
        <h4 className={styles.errorMessage}>{error.message}</h4>
        <PositiveBtn
          func={() => window.location.assign('/login')}
          text="Выйти"
        />
      </div>
    );
  }

  if (games?.length === 0) {
    return (
      <div className={styles.statisticContainer}>
        <h2 className={styles.heading}>У тебя еще нет игр</h2>
        <PositiveBtn
          func={() => window.location.assign(`/profile`)}
          text="Профиль"
          className={styles.button}
        />
        <NegativeBtn
          func={() => window.location.assign('/menu')}
          text="В меню"
          className={styles.button}
        />
      </div>
    );
  }

  return (
    <div className={styles.statisticContainer}>
      <h2 className={styles.heading}>Твоя статистика:</h2>
      <h2 className={styles.subHeading}>Твои игры:</h2>
      {games.map((game, index) => (
        <div key={game.id} className={styles.gameInfo}>
          <a href={`/game/${game.id}`}>
            {game.steps.length > 0 && (
              <div>
                {index + 1}) Время:{' '}
                {millisecondsToMinuteAndSeconds(
                  new Date(game.steps[game.steps.length - 1].time) -
                    new Date(game.startTime)
                )}
                ; Попыток: {game.steps?.length}; Правильный ответ был:{' '}
                {game?.rightAnswer}; Ограничение:{' '}
                {getLimitationNames(game?.limitation)}; Угадано:{' '}
                {game?.isGuessed ? 'да' : 'нет'}
              </div>
            )}
          </a>
        </div>
      ))}
      <PositiveBtn
        func={() => window.location.assign(`/profile`)}
        text="Профиль"
        className={styles.button}
      />
      <NegativeBtn
        func={() => window.location.assign('/menu')}
        text="В меню"
        className={styles.button}
      />
    </div>
  );
};

export default Statistic;
