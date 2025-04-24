import api from "@/api/axios";
import { removeToken } from "@/utils/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  interface User {
    name: string;
    email: string;
  }

  const [user, setUser] = useState<User | null>(null);

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  useEffect(() => {
    api
      .get("/api/users/profile")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("유저 정보 가져오기 실패:", err);
        alert("로그인이 필요합니다.");
        removeToken();
        navigate("/login");
      });
  }, []);

  if (!user) {
    return <div className="p-10">유저 정보를 불러오는 중...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">🎉 로그인 성공!</h1>
      <p className="mt-2">
        안녕하세요, <strong>{user.name}</strong>님!
      </p>
      <p className="text-sm text-gray-600">이메일: {user.email}</p>
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        로그아웃
      </button>
    </div>
  );
}
