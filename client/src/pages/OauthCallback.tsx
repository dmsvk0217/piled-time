import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

export default function OauthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

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

  return <div>로그인 처리 중...</div>;
}
