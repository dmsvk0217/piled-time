import { isAuthenticated } from "@/utils/auth";
import { useEffect, useState } from "react";

export function useAuthCheck() {
  const [auth, setAuth] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await isAuthenticated();
        setAuth(result);
      } catch {
        setAuth(false);
      } finally {
        setChecking(false);
      }
    };
    checkAuth();
  }, []);

  return { auth, checking };
}
