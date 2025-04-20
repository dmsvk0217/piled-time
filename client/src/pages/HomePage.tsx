import { removeToken } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">🎉 로그인 성공!</h1>
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        로그아웃
      </button>
    </div>
  );
}
