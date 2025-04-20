import { setToken } from "@/utils/auth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OauthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      setToken(token);
      navigate("/");
    } else {
      alert("로그인 실패");
      navigate("/login");
    }
  }, []);

  return <div className="p-10">로그인 처리 중...</div>;
}
