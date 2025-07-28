import axios from "@/api/axios";

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    await axios.get("/api/users/profile");
    return true;
  } catch {
    return false;
  }
};
