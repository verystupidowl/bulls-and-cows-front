import React, { useEffect, useState } from 'react';
import PositiveBtn from '../btn/PositiveBtn.js';
import NegativeBtn from '../btn/NegativeBtn.js';
import { BASE_URL, mapBoolean, mapGender, mapRole } from '../common/Utils.js';
import styles from '../style/Statistic.module.css';

const UserAdmin = (props) => {
  const id = props.match.params.id;
  const [profile, setProfile] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/admin/getUser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        setProfile(result);
      } catch (e) {
        setError(e);
      }
    };

    fetchProfile();
  }, [id]);

  const blockUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/admin/setBlocked/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
      });
      const result = await res.json();
      setProfile(result);
    } catch (e) {
      console.log(e);
      setError(e);
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

  return (
    <div className={styles.statisticContainer}>
      <h2 className={styles.heading}>Профиль</h2>
      <h2 className={styles.subHeading}>ID: {profile.id}</h2>
      <h2 className={styles.subHeading}>Имя: {profile.name}</h2>
      <h2 className={styles.subHeading}>Почта: {profile.email}</h2>
      <h2 className={styles.subHeading}>Пол: {mapGender(profile.gender)}</h2>
      <h2 className={styles.subHeading}>Роль: {mapRole(profile.role)}</h2>
      <h2 className={styles.subHeading}>
        Активный: {mapBoolean(profile.isActive)}
      </h2>
      <NegativeBtn
        func={blockUser}
        text={profile.isActive ? 'Block user' : 'Unblock user'}
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

export default UserAdmin;
