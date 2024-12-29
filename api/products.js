import api from "./axios";

export const productAPI = {
  fetchItems: (filters, page = 1) => api.get(`/products/list?page=${page}`, { params: filters }),
  fetchSellProducts: () => api.get("products/recent/?type=sell"),
  fetchBuyProducts: () => api.get("products/recent/?type=buy"),
  fetchProductBySlug: (slug) => api.get(`products/${slug}/`),
  submitForm: (formData) => api.post("products/", formData),
};
