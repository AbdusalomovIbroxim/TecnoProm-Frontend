import { 
  fetchCategories, 
  fetchSubcategories, 
  fetchTags, 
  fetchCountries, 
  fetchCities 
} from "../api/resources";

export default {
  state: {
    categories: [],
    subcategories: [],
    tags: [],
    countries: [],
    cities: [],
  },
  getters: {
    getCategories: (state) => state.categories,
    getSubcategories: (state) => state.subcategories,
    getTags: (state) => state.tags,
    getCountries: (state) => state.countries,
    getCities: (state) => state.cities,
  },
  actions: {
    async fetchCategories({ commit }) {
      try {
        const response = await fetchCategories();
        commit('setCategories', response.data);
      } catch (error) {
        console.error('Ошибка при загрузке категорий', error);
      }
    },
    async fetchSubcategories({ commit }, categoryId) {
      try {
        const response = await fetchSubcategories(categoryId);
        commit('setSubcategories', response.data);
        return response.data;
      } catch (error) {
        console.error('Ошибка при загрузке суб категорий', error);
      }
    },
    async fetchTags({ commit }, { categoryId, subcategoryIds }) {
      try {
        const response = await fetchTags(categoryId, subcategoryIds);
        commit('setTags', response.data);
        return response.data;
      } catch (error) {
        console.error('Ошибка при загрузке тегов', error);
      }
    },
    async fetchCountries({ commit }) {
      try {
        const response = await fetchCountries();
        commit('setCountries', response.data);
      } catch (error) {
        console.error('Ошибка при загрузке стран', error);
      }
    },
    async fetchCities({ commit }, countryId) {
      try {
        const response = await fetchCities(countryId);
        commit('setCities', response.data);
      } catch (error) {
        console.error('Ошибка при загрузке городов', error);
      }
    },
    resetSubcategoriesAndTags({ commit }) {
      commit('setSubcategories', []);
      commit('setTags', []);
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
    setCountries(state, countries) {
      state.countries = countries;
    },
    setCities(state, cities) {
      state.cities = cities;
    },
  },
};
