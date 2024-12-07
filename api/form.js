import apiClient from "./axios";

export const submitForm = (formData) => {
  return apiClient.post("products/", formData);
};
