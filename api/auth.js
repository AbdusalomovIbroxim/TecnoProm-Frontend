// /api/auth.js
import axios from './axios';  // Путь к вашему экземпляру Axios


export const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Токен отсутствует');
    const response = await axios.get('/auth/me/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при получении данных пользователя: ' + error.message);
  }
};


export const login = async (telephone, password) => {
  try {
    const response = await axios.post('/auth/login/', { telephone, password });
    return response.status;
  } catch (error) {
    throw new Error('Ошибка при входе: ' + error.message);
  }
};

export const register = async (telephone, password) => {
  try {
    const response = await axios.post('/auth/register/', { telephone, password });
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при регистрации: ' + error.message);
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await axios.post('/auth/token/refresh/', { refresh: refreshToken });

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

export const verify_phone = async (telephone, otp_code) => {
  try {
    const response = await axios.post('/auth/verify-phone/', { telephone, code: otp_code });
    localStorage.removeItem("telephone");
    localStorage.setItem('token', response.access);
    localStorage.setItem('refresh_token', response.access);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при верификации номера телефона: ' + error.message);
  }
};