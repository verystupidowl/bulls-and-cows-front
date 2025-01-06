import React, { useState } from 'react';
import PositiveBtn from '../btn/PositiveBtn.js';
import { BASE_URL } from '../common/Utils.js';
import styles from '../style/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getFieldError = (field) => {
    const fieldError = error.find((err) => err.field === field);
    return fieldError ? fieldError.message : '';
  };

  const handleClick = async (event) => {
    const authUrl = `${BASE_URL}/auth/login`;
    event.preventDefault();
    setIsLoading(true);
    setError([]);

    const player = { email, password };
    try {
      const res = await fetch(authUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player),
      });

      if (res.ok) {
        const result = await res.json();
        localStorage.setItem('token', result.token);
        window.location.assign(`/menu/`);
      } else if (res.status === 403) {
        setError([{ field: '', message: 'Неправильный логин и/или пароль' }]);
      } else {
        const result = await res.json();
        setError(result || [{ field: '', message: 'Ошибка входа' }]);
      }
    } catch (err) {
      setError({ field: '', message: 'Ошибка сети. Попробуйте позже.' });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form} noValidate autoComplete="off">
        <div className={styles.inputWrapper}>
          <input
            value={email}
            className={`${styles.input} ${
              getFieldError('email') ? styles.error : ''
            }`}
            placeholder="Введите почту"
            onChange={(event) => setEmail(event.target.value.trim())}
          />
          {getFieldError('email') && (
            <p className={styles.errorMessage}>{getFieldError('email')}</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.passwordWrapper}>
            <input
              value={password}
              type={showPassword ? 'text' : 'password'}
              className={`${styles.input} ${
                getFieldError('password') ? styles.error : ''
              }`}
              placeholder="Введите пароль"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {getFieldError('password') && (
            <p className={styles.errorMessage}>{getFieldError('password')}</p>
          )}
        </div>
        {error && (
          <p className={styles.error}>
            {error.filter((e) => e.field === '').map((e) => e.message)}
          </p>
        )}
        <PositiveBtn
          func={handleClick}
          text={isLoading ? 'Loading...' : 'Login'}
          disabled={isLoading}
        />
      </form>
      <br />
      <a href="/signup">Sign up!</a>
    </div>
  );
};

export default Login;
