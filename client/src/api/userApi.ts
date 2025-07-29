import { User } from "@/types/user";
import api from "./axios";

export const fetchUserProfile = async (): Promise<User> => {
  const res = await api.get<User>("/api/users/profile");
  return res.data;
};

export const logout = async (): Promise<void> => {
  const res = await api.get<void>("/api/auth/logout");
  return res.data;
};
