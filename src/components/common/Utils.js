import { jwtDecode } from 'jwt-decode';

export const BASE_URL = 'http://localhost:8080/bullsandcows';

export const extractFromToken = (token, attribute) => {
  try {
    const decoded = jwtDecode(token);
    switch (attribute) {
      case 'ID':
        return decoded.id;
      case 'email':
        return decoded.sub;
      case 'role':
        return decoded.role;
    }
  } catch (err) {
    console.error('Ошибка при декодировании токена:', err);
    return null;
  }
};

export const mapGender = (gender) => {
  switch (gender) {
    case 'MALE':
      return 'Мужской';
    case 'FEMALE':
      return 'Женский';
  }
};

export const mapRole = (role) => {
  switch (role) {
    case 'ROLE_USER':
      return 'Пользователь';
    case 'ROLE_ADMIN':
      return 'Администратор';
  }
};

export const mapBoolean = (value) => {
  switch (value) {
    case true:
      return 'Yes';
    case false:
      return 'No';
  }
};
