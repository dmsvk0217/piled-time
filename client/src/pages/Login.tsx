export default function Login() {
  const handleOAuthLogin = () => {
    window.location.href = "https://your-api.com/auth/google";
  };

  return (
    <div className="p-10">
      <h1 className="text-xl mb-4">로그인 페이지</h1>
      <button onClick={handleOAuthLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Google로 로그인
      </button>
    </div>
  );
}
