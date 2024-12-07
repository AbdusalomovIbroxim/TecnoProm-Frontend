import {
    fetchCategories,
    fetchSubcategories
  } from "../api/categories";
  import { fetchTags } from "../api/tags";
  import {
    fetchCountries,
    fetchCities
  } from "../api/countries";
  
  export default {
    state: {
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
          const response = await fetchCategories();
          commit("setCategories", response.data);
          console.log("Категории:", response.data);
        } catch (error) {
          console.error("Ошибка при получении категорий:", error);
        }
      },
  
      async fetchSubcategories({ commit }, categoryId) {
        try {
          const response = await fetchSubcategories(categoryId);
          commit("setSubcategories", response.data);
          console.log("Подкатегории:", response.data);
          return response.data;
        } catch (error) {
          console.error("Ошибка при получении подкатегорий:", error);
        }
      },
  
      async fetchTags({ commit }, { categoryId, subcategoryIds }) {
        try {
          const response = await fetchTags(categoryId, subcategoryIds);
          commit("setTags", response.data);
          console.log("Теги:", response.data);
          return response.data;
        } catch (error) {
          console.error("Ошибка при загрузке тегов:", error);
        }
      },
  
      async fetchCountries({ commit }) {
        try {
          const response = await fetchCountries();
          commit("setCountries", response.data);
          console.log("Страны:", response.data);
        } catch (error) {
          console.error("Ошибка при получении стран:", error);
        }
      },
  
      async fetchCities({ commit }) {
        try {
          const response = await fetchCities();
          commit("setCities", response.data);
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
        commit("setCountryCodes", countryCodes);
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
      getCountryCodes(state) {
        return state.countryCodes;
      },
      getCountries(state) {
        return state.countries;
      },
      getCities(state) {
        return state.cities;
      },
    },
  };
  