import { Link, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import DemoPage from "./pages/DemoPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/demo">Demo</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </div>
  );
}

export default App;
