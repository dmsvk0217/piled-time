export const getToken = () => localStorage.getItem("accessToken");

export const setToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
};

export const isAuthenticated = () => Boolean(getToken());
