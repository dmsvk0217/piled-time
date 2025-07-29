import { useAuthCheck } from "@/hooks/useAuthCheck";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { auth, checking } = useAuthCheck();

  if (checking) return <div>로딩 중...</div>;

  return auth ? children : <Navigate to="login" />;
}
