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

export default function WeeklyPlanTimeTable() {
  const weeklyData = useWeeklyStatsStore((s) => s.weeklyData);

  const getDayLabel = (dateStr: string): string => {
    const day = new Date(dateStr).getDay(); // 0 (일) ~ 6 (토)
    return ["일", "월", "화", "수", "목", "금", "토"][day];
  };

  return (
    <div className="flex gap-4 w-fit min-w-max">
      {DAY_LABELS.map((label) => {
        const dailyData = weeklyData.find((day) => getDayLabel(day.date) === label);
        const entries =
          dailyData?.todos
            .filter((todo) => todo.plan)
            .map((todo) => ({
              todoDetail: todo,
              entry: todo.plan,
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
          <div key={label} className="min-w-[140px] max-w-[140px]">
            <h3 className="font-semibold text-center mb-2">{label}</h3>
            <table className="border w-full text-xs select-none table-fixed">
              <thead>
                <tr>
                  <th></th>
                  {MINUTES.map((m) => (
                    <th key={m} className="border font-light text-xs text-center whitespace-nowrap">
                      {m.toString().padStart(2, "0")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOURS.map((hour) => (
                  <tr key={hour}>
                    <td className="border font-light text-center bg-gray-50">
                      {hour.toString().padStart(2, "0")}
                    </td>
                    {MINUTES.map((min) => {
                      const idx = getCellIndex(hour, min);
                      const { entry, bgColor, borderClass } = getCellProps(idx);
                      return (
                        <td
                          key={idx}
                          className={`border ${borderClass}`}
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
