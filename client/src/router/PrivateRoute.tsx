import { isAuthenticated } from "@/utils/auth";
import { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    isAuthenticated().then((result) => {
      setAuth(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return auth ? children : <Navigate to="login" />;
}
