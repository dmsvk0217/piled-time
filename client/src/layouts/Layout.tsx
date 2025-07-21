import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">home</Link>
        <Link to="/stats/weekly">주간통계</Link>
        <Link to="/stats/monthly">월간통계</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
