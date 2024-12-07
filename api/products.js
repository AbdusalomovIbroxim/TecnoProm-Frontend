import axios from "./axios";

export const fetchItems = (page = 1) => {
  return axios.get(`/products/list?page=${page}`);
};

export const fetchSellProducts = () => {
  return axios.get("products/recent/?type=sell");
};

export const fetchBuyProducts = () => {
  return axios.get("products/recent/?type=buy");
};

export const fetchProductBySlug = (slug) => {
  return axios.get(`products/${slug}/`);
};
