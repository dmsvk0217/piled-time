import Logo from "@/assets/piled-time-logo.svg?react";
import { isAuthenticated } from "@/utils/auth";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [auth, setAuth] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    isAuthenticated().then((auth) => {
      setAuth(auth);
      setChecking(false);
    });
  }, []);

  const handleGoogleLogin = () => {
    const apiUrl = new URL("/api/auth/google", import.meta.env.VITE_API_SERVER_URL);
    window.location.href = apiUrl.href;
  };

  if (checking) return <div>인증 확인 중...</div>;

  if (auth) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center">
        <div
          className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center animate-fadein"
          style={{ animation: "fadein 0.8s" }}>
          <Logo className="w-32 h-32" />
          <p className="text-gray-500 mb-6 text-center text-sm">
            시간 관리와 습관을 쌓아가는 <br />
            <span className="font-semibold text-gray-700">Piled Time</span>에서
            <br />
            나만의 목표를 실천해보세요!
          </p>
          <br />
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 w-full justify-center bg-gray-100 hover:bg-gray-200 transition-colors duration-200 border border-gray-300 rounded-lg py-2 px-4 font-semibold text-gray-700 shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="구글로 로그인">
            <FcGoogle size={20} />
            Google로 로그인
          </button>
        </div>
      </div>
      <footer className="text-center text-xs text-gray-500 py-4">
        © 2024 Piled Time &nbsp;|&nbsp; 시간 관리의 시작, Piled Time과 함께 하세요.
      </footer>
      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;
