import axios from "./axios";

export const fetchCategories = () => {
  return axios.get("/categories/");
};

export const fetchSubcategories = (categoryId) => {
  return axios.get(`/categories/?category_id=${categoryId}`);
};
