import logo from "@/assets/piled-time-logo.svg"; // 경로 확인 필요
import { useAuthStore } from "@/stores/useAuthStore";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* 상단 네비게이션 바 */}
      <nav className="relative bg-white shadow px-6 flex items-center justify-between">
        {/* 로고 (좌측 고정) */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Piled Time" className="h-20 w-auto" />
        </Link>

        {/* 메뉴 (가운데 정렬) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-20 text-lg font-medium">
          <Link
            to="/"
            className="text-gray-700 hover:text-black tracking-wide hover:font-semibold transition">
            플래닝
          </Link>
          <Link
            to="/stats/weekly"
            className="text-gray-700 hover:text-black tracking-wide hover:font-semibold transition">
            주간 통계
          </Link>
          <Link
            to="/stats/monthly"
            className="text-gray-700 hover:text-black tracking-wide hover:font-semibold transition">
            월간 통계
          </Link>
        </div>

        {/* 로그아웃 버튼 (우측) */}
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 bg-gray-700 text-white rounded hover:bg-gray-800 transition text-sm">
          로그아웃
        </button>
      </nav>

      {/* 콘텐츠 영역 */}
      <main className="px-6 py-6 w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
