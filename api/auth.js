// /api/auth.js
import api from './axios';

export const saveCSRFToken = async () => {
  try {
    const csrfResponse = await api.get('/auth/csrf-token/');
    sessionStorage.setItem('csrf_token', csrfResponse.data.csrf_token);
    return csrfResponse.data.csrf_token;
  } catch (error) {
    console.error('Ошибка при получении CSRF токена:', error.message);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await api.get('/auth/check-status/', {
      headers: {
        'X-CSRFToken': sessionStorage.getItem('csrf_token'),
      }
    })
    if (response.status === 200) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }
    return response.status;
  } catch (error) {
    console.error('Ошибка при проверке статуса авторизации:', error.message);
    throw error;
  }
};


export const fetchUser = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Токен отсутствует');

    const response = await api.get('/auth/me/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Ошибка сервера:', error.response.status, error.response.data);
    } else {
      console.error('Ошибка 123:', error.message);
    }
    throw error;
  }
};

export const login = async (telephone, password) => {
  try {
    const response = await api.post('/auth/login/', { telephone, password });
    return response.status;
  } catch (error) {
    if (error.response) {
      console.error('Ошибка сервера при входе:', error.response.status, error.response.data);
    } else {
      console.error('Ошибка при входе:', error.message);
    }
    throw new Error('Ошибка при входе: ' + error.message);
  }
};

export const register = async (telephone, password) => {
  try {
    const response = await api.post('/auth/register/', { telephone, password });
    return response.status;
  } catch (error) {
    if (error.response) {
      console.error('Ошибка сервера при регистрации:', error.response.status, error.response.data);
    } else {
      console.error('Ошибка при регистрации:', error.message);
    }
    throw new Error('Ошибка при регистрации: ' + error.message);
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await api.post('/auth/refresh/', { refresh: refreshToken });

    if (response && response.data.access && response.data.refresh) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      return true;
    } else {
      throw new Error('Не удалось обновить токен');
    }
  } catch (error) {
    if (error.response) {
      console.error('Ошибка сервера при обновлении токена:', error.response.status, error.response.data);
    } else {
      console.error('Ошибка при обновлении токена:', error.message);
    }
    throw new Error('Ошибка при обновлении токена: ' + error.message);
  }
};

export const verify_phone = async (telephone, otp_code) => {
  try {
    const response = await api.post('/auth/verify-phone/', { telephone, code: otp_code });
    localStorage.removeItem("telephone");
    localStorage.setItem('access_token', response.data.access_token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    return response.status;
  } catch (error) {
    if (error.response) {
      console.error('Ошибка сервера при верификации номера телефона:', error.response.status, error.response.data);
    } else {
      console.error('Ошибка при верификации номера телефона:', error.message);
    }
    throw new Error('Ошибка при верификации номера телефона: ' + error.message);
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('csrf_token');
    return true;
  } catch (error) {
    console.error('Ошибка при выходе из системы:', error.message);
    throw new Error('Ошибка при выходе из системы: ' + error.message);
  }
};
