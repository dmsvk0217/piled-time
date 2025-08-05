import { useWeeklyStatsStore } from "@/stores/useWeeklyStatsStore";
import { getBorderClass } from "@/utils/borderUtil";
import { createBlockInfoMap } from "@/utils/createBlockInfoMap";
import {
  buildCellItemMap,
  DAY_LABELS,
  getCellIndex,
  getItemCellIndexes,
  HOURS,
  MINUTES,
} from "@/utils/timeTableUtils";

export default function WeeklyActionTimeTable() {
  const weeklyData = useWeeklyStatsStore((s) => s.weeklyData);

  const getDayLabel = (dateStr: string): string => {
    const day = new Date(dateStr).getDay(); // 0 (일) ~ 6 (토)
    return ["일", "월", "화", "수", "목", "금", "토"][day];
  };

  return (
    <div className="grid grid-cols-7 gap-4 w-full overflow-x-auto">
      {DAY_LABELS.map((label) => {
        const dailyData = weeklyData.find((day) => getDayLabel(day.date) === label);
        const entries =
          dailyData?.todos
            .filter((todo) => todo.action)
            .map((todo) => ({
              todoDetail: todo,
              entry: todo.action,
            })) ?? [];

        const cellItemMap: Record<number, any> = buildCellItemMap(entries, getItemCellIndexes);

        entries.forEach((entry: any) => {
          const idx = getCellIndex(entry.hour, entry.minute);
          cellItemMap[idx] = entry;
        });

        const totalCells = HOURS.length * MINUTES.length;
        const blockInfoMap = createBlockInfoMap(cellItemMap, totalCells);

        const getCellProps = (idx: number) => {
          const entry = cellItemMap[idx];
          const blockInfo = blockInfoMap[entry?.todoDetail?.id ?? -1];

          return {
            entry,
            bgColor: entry?.todoDetail?.category?.color || "#f3f4f6", // default bg
            borderClass: blockInfo
              ? getBorderClass(idx, blockInfo.startIdx, blockInfo.endIdx, MINUTES.length)
              : "",
          };
        };

        return (
          <div key={label}>
            <h3 className="font-semibold text-center mb-2">{label}</h3>
            <table className="border text-xs select-none table-fixed w-full">
              <thead>
                <tr>
                  <th className="border px-2 py-1">시간</th>
                  {MINUTES.map((m) => (
                    <th key={m} className="border px-2 py-1">
                      {m.toString().padStart(2, "0")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOURS.map((hour) => (
                  <tr key={hour}>
                    <td className="border px-2 py-1 font-bold bg-gray-50">
                      {hour.toString().padStart(2, "0")}
                    </td>
                    {MINUTES.map((min) => {
                      const idx = getCellIndex(hour, min);
                      const { entry, bgColor, borderClass } = getCellProps(idx);
                      return (
                        <td
                          key={idx}
                          className={`border w-8 h-6 ${borderClass}`}
                          style={{ backgroundColor: bgColor, opacity: entry ? 0.7 : 1 }}
                          title={entry?.todoDetail?.content || ""}
                        />
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
