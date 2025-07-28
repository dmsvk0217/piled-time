import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OauthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return <div>로그인 처리 중...</div>;
}
