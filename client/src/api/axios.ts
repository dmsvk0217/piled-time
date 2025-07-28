import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isLoginPage = window.location.pathname === "/login";

    if (err.response?.status === 401 && !isLoginPage) {
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

export default api;
