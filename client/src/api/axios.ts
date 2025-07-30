import { getCsrfToken } from "@/utils/auth";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrf = getCsrfToken();
  if (csrf) {
    config.headers["X-CSRF-Token"] = csrf;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<(error?: AxiosError) => void> = [];

const processQueue = (error?: AxiosError) => {
  failedQueue.forEach((cb) => cb(error));
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _csrfRetry?: boolean;
    };

    const isLoginPage = window.location.pathname === "/login";

    if (error.response?.status === 403 && !originalRequest._csrfRetry) {
      originalRequest._csrfRetry = true;
      try {
        await api.get("/api/auth/csrf-token");
        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    if (error.response?.status === 401 && !originalRequest._retry && !isLoginPage) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await api.get("/api/auth/refresh");
          processQueue();
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(error);
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push((err) => {
          if (err) {
            reject(err);
          } else {
            resolve(api(originalRequest));
          }
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
