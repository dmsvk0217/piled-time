import { User } from "@/types/user";
import api from "./axios";

export const fetchUserProfile = async (): Promise<User> => {
  const res = await api.get<User>("/api/users/profile");
  return res.data;
};
