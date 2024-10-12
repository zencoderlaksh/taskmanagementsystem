import axios from "axios";
import {
  BASE_URL,
  TOKEN_KEY,
  AUTH_HEADER,
  BEARER_PREFIX,
} from "../constants/identifiers";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers[AUTH_HEADER] = `${BEARER_PREFIX} ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
