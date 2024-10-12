import api from "./apiInstance";
import { ERROR_DEFAULT_MESSAGE } from "../constants/identifiers";

export const apiRequest = {
  get: async (url) => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || ERROR_DEFAULT_MESSAGE;
    }
  },

  post: async (url, data) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || ERROR_DEFAULT_MESSAGE;
    }
  },

  put: async (url, data) => {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || ERROR_DEFAULT_MESSAGE;
    }
  },

  delete: async (url) => {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || ERROR_DEFAULT_MESSAGE;
    }
  },
};
export default apiRequest;
