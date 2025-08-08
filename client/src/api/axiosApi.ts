import { getCsrfToken } from "@/utils/authUtils";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<(error?: AxiosError) => void> = [];

const processQueue = (error?: AxiosError) => {
  failedQueue.forEach((cb) => cb(error));
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const csrf = getCsrfToken();
  if (csrf) {
    config.headers["X-CSRF-Token"] = csrf;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _csrfRetry?: boolean;
    };

    const isLoginPage = window.location.pathname === "/login";

    if (status === 403 && !originalRequest._csrfRetry) {
      originalRequest._csrfRetry = true;
      try {
        await api.get("/api/auth/csrf-token");
        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    if (status === 401 && !originalRequest._retry && !isLoginPage) {
      const isRefreshCall = originalRequest.url?.includes("/api/auth/refresh");
      originalRequest._retry = true;

      if (isRefreshCall) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await api.get("/api/auth/refresh");
          processQueue();
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(error);
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

    if (![401, 403].includes(status ?? 0)) {
      const err = error as AxiosError<any>;
      const message =
        err.response?.data?.message || err.message || "예상치 못한 오류가 발생했습니다.";
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
