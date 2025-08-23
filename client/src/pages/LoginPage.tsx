import Logo from "@/assets/piled-time-logo.png";
import { useAuthStore } from "@/stores/useAuthStore";
import { FcGoogle } from "react-icons/fc";
import {
  RiBarChart2Line,
  RiCalendarScheduleLine,
  RiDragMove2Fill,
  RiFlashlightLine,
  RiPieChart2Line,
} from "react-icons/ri";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user, loading } = useAuthStore();
  const { login } = useAuthStore();

  if (loading) return <div className="min-h-screen grid place-items-center">인증 확인 중...</div>;
  if (user) return <Navigate to="/" />;

  // 예: 헤더 실제 높이에 맞춰 조정 (px)
  const HEADER_H = 88;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("features");
    if (!el) return;

    // 현재 문서의 스크롤 위치/한계 계산
    const rect = el.getBoundingClientRect();
    const absoluteY = rect.top + window.pageYOffset - HEADER_H;

    const doc = document.scrollingElement || document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;

    // 문서 한계를 넘지 않도록 보정 (음수 방지도 함께)
    const target = Math.max(0, Math.min(absoluteY, maxScroll));

    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800">
      {/* 배경 데코 (경량화) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* 글로우 1개로 축소 + blur 강도 축소 */}
        <div
          className="absolute -top-28 -left-28 h-[22rem] w-[22rem] rounded-full opacity-25 blur-xl"
          style={{ background: "radial-gradient(closest-side, #a5b4fc, transparent 70%)" }}
        />
        {/* 경량 SVG 도트 패턴 (페인트 부담↓) */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(15,23,42,0.06)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* 헤더 */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Piled Time 로고" className="h-8 w-8" />
            <span className="font-semibold">Piled Time</span>
            <span className="ml-3 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
              ver1
            </span>
          </div>
        </div>
      </header>

      {/* 히어로 */}
      <section id="about" className="relative z-10">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-10 pt-8 md:grid-cols-2 md:gap-16 md:pt-14">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 [animation-fill-mode:both]">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              축적의 시간
              <br />
              <span className="text-slate-600 text-lg md:text-2xl">
                플래닝과 피드백을 통해 어제보다 나은 오늘을
              </span>
            </h1>
            <p className="mt-4 text-slate-600 md:text-lg">
              하루를 드래그로 직관적으로 기록하고, <b>주간·월간</b> 단위로 데이터를 분석해 다음
              계획을 더 똑똑하게 세우는 웹 서비스입니다.
            </p>
            <p>9년간의 플래너 사용 경험을 바탕으로 실제 사용성을 최우선으로 설계했어요.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={login}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.99]"
                aria-label="구글로 로그인">
                <FcGoogle size={18} />
                Google로 무료 시작
              </button>
              <a
                href="#features"
                onClick={handleClick}
                className="rounded-2xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold backdrop-blur hover:bg-white">
                기능 살펴보기
              </a>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-sky-400" /> 오프라인 플래너의
                한계 보완
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-violet-400" /> 시간 단위
                기록/분석 강화
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> 1인
                기획·디자인·개발·배포
              </li>
            </ul>
          </div>

          {/* 로그인 카드 (스케일 래퍼 + 등장 애니메이션) */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md origin-top scale-[0.94]">
              <div
                className="relative overflow-hidden rounded-3xl bg-white/90 p-8 shadow-xl ring-1 ring-slate-200 transform-gpu"
                style={{ animation: "cardIn 800ms ease-out 60ms both" }}>
                <div
                  className="pointer-events-none absolute -top-16 right-10 h-40 w-40 rounded-full opacity-50 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(59,130,246,.35), transparent 70%)",
                  }}
                />
                <div className="flex flex-col items-center">
                  <img src={Logo} alt="로고" className="h-24 w-24" />
                  <h2 className="mt-4 text-xl font-bold">시작해볼까요?</h2>
                  <p className="mt-2 text-center text-sm text-slate-500">
                    Google 계정으로 10초 만에 가입하고 오늘의 첫 기록을 남겨보세요.
                  </p>
                  <p className="mt-5 text-xs text-slate-400 text-center">
                    + 최소 정보만 요청하며, 기록은 언제든 내보낼 수 있어요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 섹션 */}
      <section
        id="features"
        className="relative z-10 border-t border-slate-200/70 bg-white/80 py-12 paint-contain">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex items-center gap-2">
            <RiFlashlightLine className="opacity-70" />
            <h3 className="text-xl font-bold">주요 기능</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={<RiDragMove2Fill size={20} />}
              title="드래그 기반 플래닝"
              desc="시간 블록을 드래그로 배치해 하루 계획을 직관적으로 세워요."
            />
            <Feature
              icon={<RiBarChart2Line size={20} />}
              title="주간 통계 요약"
              desc="일주일의 기록을 요약해 패턴과 집중 시간을 빠르게 파악."
            />
            <Feature
              icon={<RiCalendarScheduleLine size={20} />}
              title="주간 타임테이블"
              desc="요일·시간대별 분포를 테이블로 시각화해 빈틈을 확인."
            />
            <Feature
              icon={<RiPieChart2Line size={20} />}
              title="월간 분석"
              desc="카테고리/활동별 시간을 집계해 다음 달 계획의 근거로."
            />
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <section className="relative z-10 border-t border-slate-200/70 bg-white/70 py-10 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-lg font-bold">프로젝트 개요</h4>
            <p className="mt-2 text-sm text-slate-600">
              기존 오프라인 플래너의 통계·분석 한계를 보완하고, 온라인 플래너의 사용패턴을
              개선했습니다.
            </p>
          </div>
          <div className="text-sm text-slate-500 self-end">
            © 2025 Piled Time · 시간 관리의 시작, Piled Time과 함께 하세요.
          </div>
        </div>
      </section>

      {/* 애니메이션 키프레임 */}
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in { from{opacity:0} to{opacity:1} }
        @keyframes slide-in-from-bottom-2 { from{ transform: translateY(12px) } to{ transform: translateY(0) } }
        .animate-in { animation-duration: .7s; animation-timing-function: cubic-bezier(.2,.8,.2,1); }
        .fade-in { animation-name: fade-in; }
        .slide-in-from-bottom-2 { animation-name: slide-in-from-bottom-2, fade-in; }
      `}</style>
    </div>
  );
};

/* --- 프리젠테이셔널 컴포넌트 --- */

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
        {icon}
        {title}
      </div>
      <p className="text-sm text-slate-600">{desc}</p>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition duration-300 group-hover:opacity-60"
        style={{
          background: "radial-gradient(closest-side, rgba(99,102,241,.35), transparent 70%)",
        }}
      />
    </div>
  );
}

export default Login;
