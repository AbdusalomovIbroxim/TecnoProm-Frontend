// store/products.js
import axios from "../api/axios";

export default {
    state: {
        sellProducts: [],
        buyProducts: [],
    },

    actions: {
        async fetchSellProducts({ commit }) {
            try {
                const response = await axios.get('products/recent/?type=sell');
                const data = response.data;
                commit('setSellProducts', data);
            } catch (error) {
                console.error("Ошибка при получении продуктов для продажи:", error);
            }
        },

        async fetchBuyProducts({ commit }) {
            try {
                const response = await axios.get('products/recent/?type=buy');
                const data = response.data;
                commit('setBuyProducts', data);
            } catch (error) {
                console.error("Ошибка при получении продуктов для покупки:", error);
            }
        }
    },

    mutations: {
        setSellProducts(state, products) {
            state.sellProducts = products;
        },

        setBuyProducts(state, products) {
            state.buyProducts = products;
        }
    },

    getters: {
        getSellProducts(state) {
            return state.sellProducts;
        },

        getBuyProducts(state) {
            return state.buyProducts;
        }
    }
};
