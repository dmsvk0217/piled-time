import { TimeTableEntry } from "@/types/timetable";

interface TimeTableItemModalProps {
  open: boolean;
  selectedEntry: TimeTableEntry;
  loading: boolean;
  onDelete: () => void;
  onClose: () => void;
}

const TimeTableItemModal = ({
  open,
  selectedEntry,
  loading,
  onDelete,
  onClose,
}: TimeTableItemModalProps) => {
  if (!open || !selectedEntry) return null;

  const start = new Date(selectedEntry.entry.startAt);
  const end = new Date(start.getTime() + selectedEntry.entry.duration * 60000);

  const formatTime = (date: Date) =>
    `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center"
      onClick={onClose}>
      <div
        className="bg-white rounded-lg min-w-[200px] min-h-[120px] p-6 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 text-sm leading-relaxed flex flex-col	 items-center justify-center">
          <p>
            <b>할 일:</b> {selectedEntry.todoDetail?.content}
          </p>
          <p>
            <b>카테고리:</b> {selectedEntry.todoDetail?.category?.name}
          </p>
          <p>
            <b>시간:</b> {formatTime(start)} ~ {formatTime(end)}
          </p>
        </div>

        <div className="flex justify-center	 gap-2">
          <button
            onClick={onDelete}
            disabled={loading}
            className="bg-red-600 text-white rounded px-3 py-1 text-sm hover:bg-red-700 disabled:opacity-50">
            삭제
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-900 rounded px-3 py-1 text-sm hover:bg-gray-300">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTableItemModal;
