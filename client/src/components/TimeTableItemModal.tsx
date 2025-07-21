interface TimeTableItemModalProps {
  open: boolean;
  item: any; // 실제 타입은 Action | Plan & { todo: Todo; category: Category | undefined }
  loading: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const TimeTableItemModal = ({
  open,
  item,
  loading,
  onEdit,
  onDelete,
  onClose,
}: TimeTableItemModalProps) => {
  if (!open || !item) return null;
  const start = new Date(item.startAt);
  const end = new Date(start.getTime() + item.duration * 60000);
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 50,
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}>
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          minWidth: 280,
          minHeight: 120,
          padding: 24,
          boxShadow: "0 2px 16px #0002",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}>
        <div style={{ marginBottom: 12 }}>
          <b>할 일:</b> {item.todo?.content}
          <br />
          <b>카테고리:</b> {item.category?.name}
          <br />
          <b>시간:</b> {start.getHours().toString().padStart(2, "0")}:
          {start.getMinutes().toString().padStart(2, "0")} ~{" "}
          {end.getHours().toString().padStart(2, "0")}:
          {end.getMinutes().toString().padStart(2, "0")}
        </div>
        <button
          onClick={onEdit}
          disabled={loading}
          style={{
            marginRight: 8,
            background: "#2563eb",
            color: "#fff",
            border: 0,
            borderRadius: 4,
            padding: "6px 12px",
            cursor: "pointer",
          }}>
          시간대 수정
        </button>
        <button
          onClick={onDelete}
          disabled={loading}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: 0,
            borderRadius: 4,
            padding: "6px 12px",
            cursor: "pointer",
          }}>
          삭제
        </button>
        <button
          onClick={onClose}
          style={{
            marginLeft: 8,
            background: "#e5e7eb",
            color: "#222",
            border: 0,
            borderRadius: 4,
            padding: "6px 12px",
            cursor: "pointer",
          }}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default TimeTableItemModal;
