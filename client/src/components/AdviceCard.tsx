import { Advice, fetchAdvice } from "@/api/adviceApi";
import { useEffect, useState } from "react";

export default function AdviceCard() {
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdvice()
      .then(setAdvice)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 rounded-xl bg-gray-100 text-center text-gray-500">
        명언을 불러오는 중...
      </div>
    );
  }

  if (!advice) {
    return (
      <div className="p-6 rounded-xl bg-red-100 text-red-500">명언을 불러오는 데 실패했습니다.</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl border border-gray-200">
      <p className="text-lg text-gray-800 mb-4">{advice.message}</p>
      <div className="text-sm text-right text-gray-500">
        — {advice.author} ({advice.authorProfile})
      </div>
    </div>
  );
}
