import axios from "../api/axios";

export default {
  state: {
    formStatus: null,
    categories: [],
    subcategories: [],
    tags: [],
    countryCodes: [],
    countries: [],
    cities: [],
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const response = await axios.get('/categories/');
        commit('setCategories', response.data);
        console.log("Категории:", response.data);
      } catch (error) {
        console.error("Ошибка при получении категорий:", error);
      }
    },
  
    async fetchSubcategories({ commit }, categoryId) {
      try {
        const response = await axios.get(`/categories/?category_id=${categoryId}`);
        commit('setSubcategories', response.data);
        console.log("Подкатегории:", response.data);
        return response.data; // возвращаем данные
      } catch (error) {
        console.error("Ошибка при получении подкатегорий:", error);
      }
    },

    async fetchTags({ commit }, {category_id, subcategory_ids}) {
      try {
        const response = await axios.get(`/tags/?category_id=${category_id}&subcategory_id=${subcategory_ids.join('&subcategory_id=')}`);
        commit('setTags', response.data);
        console.log("Теги:", response.data);
        return response.data; // возвращаем данные
      } catch (error) {
        console.error('Ошибка при загрузке тегов:', error);
      }
    },

    async fetchCountries({ commit }) {
      try {
        const response = await axios.get('countries/');
        commit('setCountries', response.data);
        console.log("Страны:", response.data);
      } catch (error) {
        console.error("Ошибка при получении стран:", error);
      }
    },
  
    async fetchCities({ commit }) {
      try {
        const response = await axios.get('cities/');
        commit('setCities', response.data);
        console.log("Города:", response.data);
      } catch (error) {
        console.error("Ошибка при получении городов:", error);
      }
    },
  
    fetchCountryCodes({ commit }) {
      const countryCodes = [
        { name: "Россия", code: "+7" },
        { name: "США", code: "+1" },
        { name: "Узбекистан", code: "+998" },
      ];
      commit('setCountryCodes', countryCodes);
    },
  
    async submitForm({ commit }, formData) {
      try {
        const response = await axios.post('mymodels/', formData);
        commit('setFormStatus', 'success'); 
        console.log('Данные успешно отправлены:', response.data);
      } catch (error) {
        commit('setFormStatus', 'error');
        console.error("Ошибка при отправке данных:", error);
      }
    },
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setSubcategories(state, subcategories) {
      state.subcategories = subcategories;
    },
    setTags(state, tags) {
      state.tags = tags;
    },
    setCountryCodes(state, countryCodes) {
      state.countryCodes = countryCodes;
    },
    setCountries(state, countries) {
      state.countries = countries;
    },
    setCities(state, cities) {
      state.cities = cities;
    },
    setFormStatus(state, status) {
      state.formStatus = status;
    },
  },
  getters: {
    getFormStatus(state) {
      return state.formStatus;
    },
    getCategories(state) {
      return state.categories;
    },
    getSubcategories(state) {
      return state.subcategories;
    },
    getTags(state) {
      return state.tags;
    },
    getCountryCodes(state) {
      return state.countryCodes;
    },
    getCountries(state) {
      return state.countries;
    },
    getCities(state) {
      return state.cities;
    },
  }
};
