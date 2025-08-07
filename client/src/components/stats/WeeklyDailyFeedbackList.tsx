import { fetchDailyFeedbacksOfWeek } from "@/api/feedbackApi";
import { useWeeklyStatsStore } from "@/stores/useWeeklyStatsStore";
import { Feedback } from "@/types/feedback";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function WeeklyDailyFeedbackList() {
  const date = useWeeklyStatsStore((s) => s.date);

  const [dailyFeedbacks, setDailyFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadFeedbacksOfWeek = async () => {
      setLoading(true);
      const feedbacks = await fetchDailyFeedbacksOfWeek(date);
      setDailyFeedbacks(feedbacks);
      setLoading(false);
    };
    loadFeedbacksOfWeek();
  }, [date]);

  if (loading) return <div>로딩 중 ...</div>;

  return dailyFeedbacks.map((feedback) => (
    <div
      key={feedback.date}
      className="border rounded p-3 mt-1 bg-gray-50 mx-auto"
      style={{ maxWidth: 700, minWidth: 320, width: "100%" }}>
      <div className="flex flex-col gap-1">
        <strong>{`${format(feedback.date, "yyyy.MM.dd")} (${format(feedback.date, "eee", {
          locale: ko,
        })})`}</strong>
        <div>
          <b>좋았던 점:</b> {feedback.goodPoint}
        </div>
        <div>
          <b>아쉬웠던 점:</b> {feedback.badPoint}
        </div>
        <div>
          <b>기타 코멘트:</b> {feedback.comment}
        </div>
      </div>
    </div>
  ));
}
