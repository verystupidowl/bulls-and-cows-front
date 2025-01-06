import React, { useEffect, useState } from 'react';
import NegativeBtn from '../btn/NegativeBtn.js';
import { BASE_URL, extractFromToken } from '../common/Utils.js';
import styles from '../style/Statistic.module.css';

const AllUsers = () => {
  const [id, setId] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${BASE_URL}/admin/getAllUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        setUsers(result);
        setId(extractFromToken(token, 'ID'));
        console.log(id);
      } catch (e) {
        setError(e);
        setId(extractFromToken(token, 'ID'));
      }
    };

    fetchAllUsers();
  }, [id]);

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
      {users.map((user) => (
        <div key={user.id}>
          <a
            style={{ display: user.id === id ? 'none' : 'inline' }}
            href={`/admin/user/${user.id}`}
          >
            {user.name}
          </a>
        </div>
      ))}
      <NegativeBtn
        func={() => window.location.assign('/menu/' + id)}
        text="В меню"
        className={styles.button}
      />
    </div>
  );
};

export default AllUsers;
