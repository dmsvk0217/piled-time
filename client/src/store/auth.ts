import { create } from "zustand";
import api from "../api/axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchUser: async (): Promise<void> => {
    try {
      const res = await api.get<User>("/api/users/profile");
      set({ user: res.data });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  login: async (): Promise<void> => {
    const apiUrl = new URL("/api/auth/google", import.meta.env.VITE_API_SERVER_URL);
    window.location.href = apiUrl.href;
  },

  logout: async (): Promise<void> => {
    await api.post<void>("/api/auth/logout");
    set({ user: null });
  },
}));
