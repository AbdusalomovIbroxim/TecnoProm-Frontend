import { fetchCategories, fetchSubcategories } from "../api/categories";
import { fetchTags } from "../api/tags";
import { fetchCountries, fetchCities } from "../api/countries";

export default {
  state: {
    categories: [],
    subcategories: [],
    tags: [],
    countries: [],
    cities: [],
  },

  actions: {
    async fetchCategories({ commit }) {
      const response = await fetchCategories();
      commit("setCategories", response.data);
    },

    async fetchSubcategories({ commit }, categoryId) {
      const response = await fetchSubcategories(categoryId);
      commit("setSubcategories", response.data);
      return response.data;
    },

    async fetchTags({ commit }, params) {
      const response = await fetchTags(params.category_id, params.subcategory_ids);
      commit("setTags", response.data);
      return response.data;
    },

    async fetchCountries({ commit }) {
      const response = await fetchCountries();
      commit("setCountries", response.data);
    },

    async fetchCities({ commit }, countryId) {
      const response = await fetchCities(countryId);
      commit("setCities", response.data);
      return response.data;
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

  getters: {
    getCategories(state) {
      return state.categories;
    },
    getSubcategories(state) {
      return state.subcategories;
    },
    getTags(state) {
      return state.tags;
    },
    getCountries(state) {
      return state.countries;
    },
    getCities(state) {
      return state.cities;
    },
  },
};
