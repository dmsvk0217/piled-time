import { getToken } from "@/utils/auth";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // 서버 주소
  withCredentials: false, // 쿠키 방식이면 true
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
