import axios from "./axios";

export const fetchCountries = () => {
  return axios.get("countries/");
};

export const fetchCities = () => {
  return axios.get("cities/");
};
