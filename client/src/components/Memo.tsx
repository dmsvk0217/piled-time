import { createMemo, deleteMemo, fetchMemo, updateMemo } from "@/api/memoApi";
import { useHomePageStore } from "@/stores/useHomePageStore";
import { Memo as MemoType } from "@/types/memo";
import { useEffect, useState } from "react";

export default function Memo() {
  const date = useHomePageStore((s) => s.date);
  const [memo, setMemo] = useState<MemoType | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const loadMemo = async () => {
    setLoading(true);
    const data = await fetchMemo(date);
    setMemo(data);
    setContent(data?.content || "");
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    if (memo) {
      const updated = await updateMemo(memo.id, { content });
      setMemo(updated);
    } else {
      const created = await createMemo({ date, content });
      setMemo(created);
    }
    setEditing(false);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (memo) {
      setLoading(true);
      await deleteMemo(memo.id);
      setMemo(null);
      setContent("");
      setEditing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemo();
  }, [date]);

  return (
    <div className="h-[150px] border rounded p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800">📒 오늘의 메모</h3>
        {!editing && (
          <button
            className="text-blue-500 hover:underline text-sm"
            onClick={() => setEditing(true)}>
            수정
          </button>
        )}
      </div>

      {editing ? (
        <textarea
          className="w-full border rounded p-2 h-20 focus:outline-blue-400 resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
      ) : (
        <p className="overflow-y-auto max-h-[6rem] whitespace-pre-line text-gray-700">
          {memo?.content || "메모가 없습니다."}
        </p>
      )}

      {editing && (
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={handleSave}
            disabled={loading || !content.trim()}
            className="px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded text-sm">
            저장
          </button>
          {memo && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded text-sm">
              삭제
            </button>
          )}
          <button
            onClick={() => {
              setContent(memo?.content || "");
              setEditing(false);
            }}
            disabled={loading}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm">
            취소
          </button>
        </div>
      )}
    </div>
  );
}
