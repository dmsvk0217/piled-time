import CategoryManager from "@/components/category/CategoryManager";

export default function TodoTableHead() {
  return (
    <thead>
      <tr className="bg-gray-100">
        <th className="border px-4 py-2">
          <div className="flex items-center justify-center gap-2">
            카테고리
            {/* 설정 아이콘 + 모달은 CategoryManager가 내부에서 처리 */}
            <CategoryManager />
          </div>
        </th>
        <th className="border px-4 py-2">세부내용</th>
        <th className="border px-4 py-2">배치</th>
        <th className="border px-4 py-2">달성률</th>
        <th className="border px-4 py-2">작업</th>
      </tr>
    </thead>
  );
}
