import React, { useEffect, useState } from 'react';
import NegativeBtn from '../btn/NegativeBtn';
import { BASE_URL, extractFromToken } from '../common/Utils';
import styles from '../style/Statistic.module.css';

const AllGames = () => {
  const [id, setId] = useState('');
  const [games, setGames] = useState([]);
  const [field, setField] = useState('ID');
  const [order, setOrder] = useState('ASC');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllGames = async () => {
      const token = localStorage.getItem('token');
      const filter = {
        gamesPerPage: 10,
        pageNumber: 1,
        sort: { field: field, order: order },
      };
      try {
        const res = await fetch(`${BASE_URL}/game/games`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(filter),
        });
        const result = await res.json();
        setGames(result);
        setId(extractFromToken(token, 'ID'));
        console.log(id);
      } catch (e) {
        setError(e);
        setId(extractFromToken(token, 'ID'));
      }
    };

    fetchAllGames();
  }, [field, order]);

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
        <NegativeBtn
          func={() => window.location.assign('/menu/' + id)}
          text="В меню"
          className={styles.button}
        />
      </div>
    );
  }

  return (
    <div className={styles.statisticContainer}>
      <select value={field} onChange={(event) => setField(event.target.value)}>
        <option value="" disabled>
          Choose field
        </option>
        <option value="id">ID</option>
        <option value="startTime">Время начала</option>
        <option value="attempts">Количество попыток</option>
      </select>
      <select value={order} onChange={(event) => setOrder(event.target.value)}>
        <option value="" disabled>
          choose order
        </option>
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
      </select>
      {games.map((game, index) => (
        <div key={game.id} className={styles.gameInfo}>
          {game.steps.length > 0 && (
            <div>
              {index + 1}) ID: {game.id} Время:{' '}
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
        </div>
      ))}
      <NegativeBtn
        func={() => window.location.assign('/menu')}
        text="В меню"
        className={styles.button}
      />
    </div>
  );
};

export default AllGames;
