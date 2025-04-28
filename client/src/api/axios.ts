import { getToken } from "@/utils/auth";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
