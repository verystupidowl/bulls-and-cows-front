import React, { useEffect, useState } from 'react';
import NegativeBtn from '../btn/NegativeBtn.js';
import PositiveBtn from '../btn/PositiveBtn.js';
import '../style/Menu.module.css';
import { BASE_URL, extractFromToken } from './Utils.js';

const Menu = ({ match }) => {
  const id = match?.params?.id;
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/player/getPlayer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Ошибка загрузки данных');
        }
        const result = await res.json();
        setPlayer(result);
        setRole(extractFromToken(token, 'role'));
        console.log(role);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  if (isLoading) {
    return <div className="menu-container">Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="menu-container error">
        <h4>{error}</h4>
        <NegativeBtn
          func={() => window.location.assign('/login')}
          text="Выйти"
        />
      </div>
    );
  }

  return (
    <div className="menu-container">
      <h2 className="menu-title">Привет, {player?.name}!</h2>
      <div className="menu-buttons">
        <div style={{ display: role === 'ROLE_ADMIN' ? 'inlie' : 'none' }}>
          <PositiveBtn
            func={() => window.location.assign('/admin/allUsers')}
            text="Админка"
          />
        </div>
        <PositiveBtn
          func={() => window.location.assign(`/tutor`)}
          text="Играть"
        />
        <PositiveBtn
          func={() => window.location.assign(`/profile`)}
          text="Профиль"
        />
        <PositiveBtn
          func={() => window.location.assign('/games')}
          text="Games"
        />
        <NegativeBtn
          func={() => {
            localStorage.removeItem('token');
            window.location.assign('/login');
          }}
          text="Выход"
        />
      </div>
    </div>
  );
};

export default Menu;
