import axios from 'axios';
import { refreshToken } from './auth';

const api = axios.create({
    baseURL: 'http://2025.tecnoprom.uz/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 403) {
            const errorData = error.response.data;
            if (errorData.code === 'token_not_valid' && errorData.messages.some(msg => msg.token_class === 'AccessToken' && msg.message === 'Token is expired')) {
                try {
                    const refreshed = await refreshToken();
                    if (refreshed) {
                        const newAccessToken = localStorage.getItem('access_token');
                        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                        return api.request(error.config);
                    } else {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        window.location.href = '/auth';
                    }
                } catch (refreshError) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/auth';
                }
            } else {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/auth';
            }
        }
        return Promise.reject(error);
    }
);

export default api;