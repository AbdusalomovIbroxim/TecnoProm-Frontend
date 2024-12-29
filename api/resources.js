import api from "./axios";

export const fetchCategories = () => {
  return api.get("/resources/categories/");
};

export const fetchSubcategories = (categoryId) => {
  console.log("categoryId", categoryId);
  return api.get(`/resources/subcategories/?category_id=${categoryId}`);
};

export const fetchCountries = () => {
  return api.get("/resources/countries/");
};

export const fetchCities = (countryId) => {
  return api.get(`/resources/cities/?country_id=${countryId}`);
};

export const fetchTags = (categoryId, subcategoryIds) => {
  const subcategoryQuery = subcategoryIds.join("&subcategory_id=");
  return api.get(`/resources/tags/?category_id=${categoryId}&subcategory_id=${subcategoryQuery}`);
};
