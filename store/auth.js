// /store/auth.js

import { login, register, refreshToken } from "@/api/auth"; // Добавьте импорт функции login

export default {
  state: {
    token: '',
    isAuthenticated: false,
    formStatus: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.token = '';
      state.isAuthenticated = false;
    },
    setFormStatus(state, status) {
      state.formStatus = status;
    },
  },
  actions: {
    initializeAuth({ commit }) {
      if (process.client) {
        const token = localStorage.getItem('token');
        if (token) {
          commit('setToken', token);
        }
      }
    },

    async loginUser({ commit }, { username, password }) {
      try {
        const response = await login(username, password); // Используем функцию login
        console.log('Login response:', response);  // Логирование ответа
    
        if (response && response.access && response.refresh) {
          localStorage.setItem('token', response.access);  // Сохранение access токена
          localStorage.setItem('refresh_token', response.refresh);  // Сохранение refresh токена
          commit('setToken', response.access);  // Сохранение access токена в Vuex
          commit('setFormStatus', 'success');
        } else {
          commit('setFormStatus', 'error');
          console.error('Ошибка: Токены не получены');
        }
      } catch (error) {
        commit('setFormStatus', 'error');
        console.error('Ошибка при входе:', error.message);
      }
    },    

    async registerUser({ commit }, { username, password }) {
      try {
        const response = await register(username, password);
        commit('setFormStatus', 'success');
        return response;
      } catch (error) {
        commit('setFormStatus', 'error');
        console.error('Ошибка при регистрации:', error.message);
      }
    },

    async refreshUserToken({ commit }) {
      try {
        const response = await refreshToken();
        localStorage.setItem('token', response.access);
        commit('setToken', response.access);
      } catch (error) {
        console.error('Ошибка при обновлении токена:', error.message);
      }
    },

    logoutUser({ commit }) {
      if (process.client) {
        localStorage.removeItem('token');
      }
      commit('removeToken');
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    authFormStatus(state) {
      return state.formStatus;
    },
  },
};
