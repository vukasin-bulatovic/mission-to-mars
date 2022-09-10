import axios from "axios";

export const getData = (url) => {
  return axios.get(url);
};

export const postDataa = (url, body) => {
  return axios.post(url, body);
};
