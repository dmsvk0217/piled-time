export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_API_SERVER_URL + "/api/auth/google";
  };

  return (
    <div className="p-10">
      <h1 className="text-xl mb-4">로그인</h1>
      <button onClick={handleGoogleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Google 로그인
      </button>
    </div>
  );
}
