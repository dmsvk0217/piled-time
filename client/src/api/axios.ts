import { getToken } from "@/utils/auth";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://your-api.com", // 서버 주소
  withCredentials: false, // 쿠키 방식이면 true
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
