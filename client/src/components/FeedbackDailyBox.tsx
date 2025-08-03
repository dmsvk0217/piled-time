import {
  createDailyFeedback,
  deleteDailyFeedback,
  fetchDailyFeedbackByDate,
  updateDailyFeedback,
} from "@/api/feedbackApi";
import { Feedback, FeedbackType } from "@/types/feedback";
import { useEffect, useState } from "react";

interface Props {
  date: string; // yyyy-mm-dd
}

export default function FeedbackDailyBox({ date }: Props) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [goodPoint, setGoodPoint] = useState("");
  const [badPoint, setBadPoint] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const fb = await fetchDailyFeedbackByDate(date);
    setFeedback(fb);
    setEditMode(!fb);
    setGoodPoint(fb?.goodPoint || "");
    setBadPoint(fb?.badPoint || "");
    setComment(fb?.comment || "");
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [date]);

  const handleSave = async () => {
    setLoading(true);
    if (feedback) {
      const updated = await updateDailyFeedback(feedback.id, { goodPoint, badPoint, comment });
      setFeedback(updated);
    } else {
      const created = await createDailyFeedback({
        type: FeedbackType.DAILY,
        date,
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
    await deleteDailyFeedback(feedback.id);
    setFeedback(null);
    setGoodPoint("");
    setBadPoint("");
    setComment("");
    setEditMode(true);
    setLoading(false);
  };

  return (
    <div
      className="border rounded p-4 mt-6 bg-gray-50 mx-auto"
      style={{ maxWidth: 700, minWidth: 320, width: "100%" }}>
      <h3 className="font-bold mb-2">오늘 하루 피드백</h3>
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
