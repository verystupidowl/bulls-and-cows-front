import React, { useState } from 'react';
import PositiveBtn from '../btn/PositiveBtn.js';
import styles from '../style/Login.module.css';
import { BASE_URL, extractFromToken } from '../common/Utils.js';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);
  const [name, setName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const getFieldError = (field) => {
    const fieldError = error.find((err) => err.field === field);
    return fieldError ? fieldError.message : '';
  };

  const handleClick = async (event) => {
    const authUrl = `${BASE_URL}/auth/register`;
    event.preventDefault();
    setIsLoading(true);
    setError([]);

    const player = { name, email, password, gender, passwordConfirmation };
    try {
      const res = await fetch(authUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player),
      });

      if (res.ok) {
        const result = await res.json();
        localStorage.setItem('token', result.token);
        const id = extractFromToken(result.token, 'ID');
        window.location.assign(`menu`);
      } else {
        const result = await res.json();
        setError(result || [{ field: '', message: 'Ошибка регистрации' }]);
      }
    } catch (err) {
      setError([{ field: '', message: 'Ошибка сети. Попробуйте позже.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Sign Up!</h2>
      <form className={styles.form} noValidate autoComplete="off">
        <div className={styles.inputWrapper}>
          <input
            value={name}
            className={`${styles.input} ${
              getFieldError('name') ? styles.error : ''
            }`}
            placeholder="Введите имя"
            onChange={(event) => setName(event.target.value)}
          />
          {getFieldError('name') && (
            <p className={styles.errorMessage}>{getFieldError('name')}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            className={`${styles.input} ${
              getFieldError('gender') ? styles.error : ''
            }`}
          >
            <option value="" disabled>
              Выберите пол
            </option>
            <option value="MALE">Мужской</option>
            <option value="FEMALE">Женский</option>
          </select>
          {getFieldError('gender') && (
            <p className={styles.errorMessage}>{getFieldError('gender')}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <input
            value={email}
            className={`${styles.input} ${
              getFieldError('email') ? styles.error : ''
            }`}
            placeholder="Введите почту"
            onChange={(event) => setEmail(event.target.value)}
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

        <div className={styles.inputWrapper}>
          <div className={styles.passwordWrapper}>
            <input
              value={passwordConfirmation}
              type={showPasswordConfirmation ? 'text' : 'password'}
              className={`${styles.input} ${
                getFieldError('passwordConfirmation') ? styles.error : ''
              }`}
              placeholder="Подтверждение пароля"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() =>
                setShowPasswordConfirmation(!showPasswordConfirmation)
              }
            >
              {showPasswordConfirmation ? '🙈' : '👁️'}
            </button>
          </div>
          {getFieldError('passwordConfirmation') && (
            <p className={styles.errorMessage}>
              {getFieldError('passwordConfirmation')}
            </p>
          )}
        </div>

        <PositiveBtn
          func={handleClick}
          text={isLoading ? 'Loading...' : 'Sign Up!'}
          disabled={isLoading}
        />
      </form>
      <div>
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default SignUp;
