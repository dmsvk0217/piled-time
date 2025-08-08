import {
  createFeedback,
  deleteFeedback,
  fetchDailyFeedbackByDate,
  fetchMonthlyFeedbackByDate,
  fetchWeeklyFeedbackByDate,
  updateFeedback,
} from "@/api/feedbackApi";
import { Feedback, FeedbackType } from "@/types/feedback";
import { useEffect, useState } from "react";

interface Props {
  date: Date;
  type: FeedbackType;
}

export default function FeedbackBox({ date, type }: Props) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [goodPoint, setGoodPoint] = useState("");
  const [badPoint, setBadPoint] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const feedback = await fetchFeedback();
      setFeedback(feedback);
      setEditMode(!feedback);
      setGoodPoint(feedback?.goodPoint || "");
      setBadPoint(feedback?.badPoint || "");
      setComment(feedback?.comment || "");
      setLoading(false);
    };
    load();
  }, [date, type]);

  const handleSave = async () => {
    setLoading(true);
    if (feedback) {
      const updated = await updateFeedback(feedback.id, {
        goodPoint,
        badPoint,
        comment,
      });
      setFeedback(updated);
    } else {
      const created = await createFeedback({
        type,
        date: date.toISOString(),
        goodPoint,
        badPoint,
        comment,
      });
      setFeedback(created);
    }
    setEditMode(false);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!feedback) return;
    setLoading(true);
    await deleteFeedback(feedback.id);
    setFeedback(null);
    setGoodPoint("");
    setBadPoint("");
    setComment("");
    setEditMode(true);
    setLoading(false);
  };

  const getTitle = () => {
    switch (type) {
      case FeedbackType.DAILY:
        return "오늘 하루 피드백";
      case FeedbackType.WEEKLY:
        return "";
      case FeedbackType.MONTHLY:
        return "이번 달 피드백";
      default:
        return "피드백";
    }
  };

  const fetchFeedback = async () => {
    switch (type) {
      case FeedbackType.DAILY:
        return await fetchDailyFeedbackByDate(date);
      case FeedbackType.WEEKLY:
        return await fetchWeeklyFeedbackByDate(date);
      case FeedbackType.MONTHLY:
        return await fetchMonthlyFeedbackByDate(date);
      default:
        return null;
    }
  };

  return (
    <div className="border overflow-y-auto w-full max-h-[360px] min-w-[200px] max-w-[600px] rounded p-4 bg-gray-50 mx-auto">
      <h3 className="font-bold mb-2">{getTitle()}</h3>
      {editMode ? (
        <div className="flex flex-col gap-2">
          <textarea
            className="border rounded p-2"
            placeholder="좋았던 점"
            value={goodPoint}
            onChange={(e) => setGoodPoint(e.target.value)}
            rows={2}
          />
          <textarea
            className="border rounded p-2"
            placeholder="아쉬웠던 점"
            value={badPoint}
            onChange={(e) => setBadPoint(e.target.value)}
            rows={2}
          />
          <textarea
            className="border rounded p-2"
            placeholder="기타 코멘트"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
          />
          <div className="flex gap-2 mt-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              onClick={handleSave}
              disabled={loading}>
              저장
            </button>
            {feedback && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
                onClick={handleDelete}
                disabled={loading}>
                삭제
              </button>
            )}
            <button
              className="border px-4 py-2 rounded"
              onClick={() => setEditMode(false)}
              disabled={loading}>
              취소
            </button>
          </div>
        </div>
      ) : feedback ? (
        <div className="flex flex-col gap-2">
          <div>
            <b>좋았던 점:</b> {feedback.goodPoint}
          </div>
          <div>
            <b>아쉬웠던 점:</b> {feedback.badPoint}
          </div>
          <div>
            <b>기타 코멘트:</b> {feedback.comment}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-gray-200 px-4 py-2 rounded"
              onClick={() => setEditMode(true)}
              disabled={loading}>
              수정
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
