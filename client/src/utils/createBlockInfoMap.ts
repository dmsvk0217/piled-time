import { TimeTableEntry } from "@/types/timetable";

export function createBlockInfoMap(
  cellItemMap: Record<number, TimeTableEntry | undefined>,
  totalCells: number
): Record<number, { startIdx: number; endIdx: number; entry: TimeTableEntry }> {
  const blockInfoMap: Record<number, { startIdx: number; endIdx: number; entry: TimeTableEntry }> =
    {};

  let startIdx = -1;
  let endIdx = -1;
  let curEntry: TimeTableEntry | undefined;
  let prevEntry: TimeTableEntry | undefined;
  let nextEntry: TimeTableEntry | undefined;

  if (cellItemMap[0]) {
    startIdx = 0;
    if (cellItemMap[0].todoDetail.id !== cellItemMap[1]?.todoDetail?.id) {
      endIdx = 0;
      blockInfoMap[cellItemMap[0].todoDetail.id] = {
        startIdx,
        endIdx,
        entry: cellItemMap[0],
      };
    }
  }

  for (let i = 1; i < totalCells - 1; i++) {
    curEntry = cellItemMap[i];
    prevEntry = cellItemMap[i - 1];
    nextEntry = cellItemMap[i + 1];

    if (curEntry && curEntry.todoDetail.id !== prevEntry?.todoDetail?.id) {
      startIdx = i;
    }

    if (curEntry && curEntry.todoDetail.id !== nextEntry?.todoDetail?.id) {
      endIdx = i;
      blockInfoMap[curEntry.todoDetail.id] = {
        startIdx,
        endIdx,
        entry: curEntry,
      };
    }
  }

  const lastIdx = totalCells - 1;
  const lastEntry = cellItemMap[lastIdx];
  if (curEntry && lastEntry) {
    endIdx = lastIdx;
    blockInfoMap[curEntry.todoDetail.id] = {
      startIdx,
      endIdx,
      entry: curEntry,
    };
  }

  return blockInfoMap;
}
