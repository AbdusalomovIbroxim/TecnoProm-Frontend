// /store/auth.js

import { login, register, refreshToken, fetchUser } from "@/api/auth"; // Добавьте импорт функции login

export default {
  state: {
    token: '',
    isAuthenticated: false,
    user: null,
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
    setUser(state, user) {
      state.user = user;
    },
    setFormStatus(state, status) {
      state.formStatus = status;
    },
  },
  actions: {
    async initializeAuth({ dispatch }) {
      if (process.client) {
        const token = localStorage.getItem('token');
        if (token) {
          await dispatch('fetchCurrentUser');
        }
      }
    },
    async fetchCurrentUser({ commit }) {
      try {
        const user = await fetchUser();
        commit('setUser', user);
        commit('setFormStatus', 'success');
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error.message);
        commit('removeToken');
      }
    },

    async loginUser({ commit }, { telephone, password }) {
      try {
        const response = await login(telephone, password);
    
        if (response && response.message === 'Вход успешен, OTP отправлен на ваш телефон') {
          commit('setFormStatus', 'otp');
          return 'otp';
        } else {
          commit('setFormStatus', 'error');
        }
      } catch (error) {
        commit('setFormStatus', 'error');
        throw error;
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
        localStorage.removeItem('refresh_token');
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
    currentUser(state) {
      return state.user;
    },
    authFormStatus(state) {
      return state.formStatus;
    },
  },
};
