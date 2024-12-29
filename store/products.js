import { productAPI } from "../api/products";

export default {
  state: {
    items: [],
    totalPages: 0,
    sellProducts: [],
    buyProducts: [],
    product: null,
    formStatus: null,
  },

  actions: {
    async fetchItemsWithFilters({ commit }, { filters = {}, page = 1 }) {
      try {
        const { data } = await productAPI.fetchItems(filters, page);
        commit("setItems", data.results);
        commit("setTotalPages", data.totalPages);
      } catch (error) {
        console.error("Ошибка при получении продуктов:", error);
      }
    },
  


    async fetchSellProducts({ commit }) {
      try {
        const { data } = await productAPI.fetchSellProducts();
        commit("setSellProducts", data);
      } catch (error) {
        console.error("Ошибка при получении продуктов для продажи:", error);
      }
    },

    async fetchBuyProducts({ commit }) {
      try {
        const { data } = await productAPI.fetchBuyProducts();
        commit("setBuyProducts", data);
      } catch (error) {
        console.error("Ошибка при получении продуктов для покупки:", error);
      }
    },

    async fetchProductBySlug({ commit }, slug) {
      try {
        const { data } = await productAPI.fetchProductBySlug(slug);
        commit("setProduct", data);
      } catch (error) {
        console.error("Ошибка при получении продукта:", error);
      }
    },

    async submitForm({ commit }, formData) {
      try {
        console.log("Отправка данных...", formData);
        
        await productAPI.submitForm(formData);  // formData теперь объект, а не FormData
        commit("setFormStatus", "success");
        console.log("Данные успешно отправлены.");
      } catch (error) {
        commit("setFormStatus", "error");
        console.error("Ошибка при отправке данных:", error);
      }
    },
  },

  mutations: {
    setItems(state, items) {
      state.items = items;
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
    getItems: (state) => state.items,
    getSellProducts: (state) => state.sellProducts,
    getBuyProducts: (state) => state.buyProducts,
    getProduct: (state) => state.product,
    getFormStatus: (state) => state.formStatus,
    getTotalPages: (state) => state.totalPages,  
  },
};

