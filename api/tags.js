import axios from "./axios";

export const fetchTags = (categoryId, subcategoryIds) => {
  const subcategoryQuery = subcategoryIds.join("&subcategory_id=");
  return axios.get(`/tags/?category_id=${categoryId}&subcategory_id=${subcategoryQuery}`);
};
