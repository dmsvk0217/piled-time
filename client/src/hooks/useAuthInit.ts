import { useEffect } from "react";
import { useAuthStore } from "../store/auth";

export const useAuthInit = () => {
  const fetchUser = useAuthStore((s) => s.fetchUser);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
};
