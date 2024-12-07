import {
  fetchItems,
  fetchSellProducts,
  fetchBuyProducts,
  fetchProductBySlug,
} from "../api/products";
import { submitForm } from "../api/form";

export default {
  state: {
    Items: [],
    totalPages: 0,
    sellProducts: [],
    buyProducts: [],
    product: null,
    formStatus: null,
  },

  actions: {
    async fetchItems({ commit }, page = 1) {
      try {
        const response = await fetchItems(page);
        const data = response.data;

        commit("setItems", data.results);
        commit("setTotalPages", data.total_pages);

        console.log("Продукты получены:", data);
      } catch (error) {
        console.error("Ошибка при получении продуктов:", error);
      }
    },

    async fetchSellProducts({ commit }) {
      try {
        const response = await fetchSellProducts();
        const data = response.data;
        commit("setSellProducts", data);
        console.log("sell", data);
      } catch (error) {
        console.error("Ошибка при получении продуктов для продажи:", error);
      }
    },

    async fetchBuyProducts({ commit }) {
      try {
        const response = await fetchBuyProducts();
        const data = response.data;
        commit("setBuyProducts", data);
      } catch (error) {
        console.error("Ошибка при получении продуктов для покупки:", error);
      }
    },

    async fetchProductBySlug({ commit }, slug) {
      try {
        const response = await fetchProductBySlug(slug);
        const data = response.data;
        commit("setProduct", data);
      } catch (error) {
        console.error("Ошибка при получении продукта:", error);
      }
    },

    async submitForm({ commit }, formData) {
      try {
        await submitForm(formData);
        commit("setFormStatus", "success");
        console.log("Данные успешно отправлены.");
      } catch (error) {
        commit("setFormStatus", "error");
        console.error("Ошибка при отправке данных:", error);
      }
    },
  },

  mutations: {
    setItems(state, products) {
      state.Items = products;
    },

    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },

    setSellProducts(state, products) {
      state.sellProducts = products;
    },

    setBuyProducts(state, products) {
      state.buyProducts = products;
    },

    setProduct(state, product) {
      state.product = product;
    },

    setFormStatus(state, status) {
      state.formStatus = status;
    },
  },

  getters: {
    getItems(state) {
      return state.Items;
    },

    getSellProducts(state) {
      return state.sellProducts;
    },

    getBuyProducts(state) {
      return state.buyProducts;
    },

    getProduct(state) {
      return state.product;
    },

    getFormStatus(state) {
      return state.formStatus;
    },
  },
};
