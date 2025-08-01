import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

export const useAuthInit = () => {
  const fetchUser = useAuthStore((s) => s.fetchUser);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
};
