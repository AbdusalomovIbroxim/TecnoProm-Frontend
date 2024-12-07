// /api/auth.js
import axios from './axios';  // Путь к вашему экземпляру Axios

export const login = async (username, password) => {
  try {
    const response = await axios.post('/auth/login/', { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при входе: ' + error.message);
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post('/auth/register/', { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при регистрации: ' + error.message);
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');  // Получаем refresh токен
    const response = await axios.post('/auth/token/refresh/', { refresh: refreshToken });  // Отправляем на сервер

    if (response && response.access) {
      localStorage.setItem('token', response.access);
      return response.access;
    } else {
      throw new Error('Не удалось обновить токен');
    }
  } catch (error) {
    throw new Error('Ошибка при обновлении токена: ' + error.message);
  }
};
