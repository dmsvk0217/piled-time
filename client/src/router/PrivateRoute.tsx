import { useAuthStore } from "@/stores/useAuthStore";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuthStore();

  if (loading) return <div>로딩 중...</div>;

  return user ? children : <Navigate to="login" />;
}
