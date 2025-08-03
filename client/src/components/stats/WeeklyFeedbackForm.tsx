interface Props {
  value: { good: string; bad: string; summary: string };
  onChange: (value: Props["value"]) => void;
}

export default function WeeklyFeedbackForm({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <textarea
        placeholder="좋았던 점"
        value={value.good}
        onChange={(e) => onChange({ ...value, good: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="아쉬웠던 점"
        value={value.bad}
        onChange={(e) => onChange({ ...value, bad: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="이번 주 한줄 요약"
        value={value.summary}
        onChange={(e) => onChange({ ...value, summary: e.target.value })}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
