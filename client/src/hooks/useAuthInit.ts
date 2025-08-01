import { useEffect } from "react";
import { useAuthStore } from "../stores/auth";

export const useAuthInit = () => {
  const fetchUser = useAuthStore((s) => s.fetchUser);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
};
