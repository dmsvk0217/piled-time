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
    <div>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">home</Link>
        <Link to="/stats/weekly">주간통계</Link>
        <Link to="/stats/monthly">월간통계</Link>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
          로그아웃
        </button>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
