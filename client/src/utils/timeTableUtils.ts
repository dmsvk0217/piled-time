import { TimeTableEntry } from "@/types/timetable";

export const HOURS = Array.from({ length: 24 }, (_, i) => (i + 6) % 24); // 6, 7, ... , 24, ... , 5
export const MINUTES = [0, 10, 20, 30, 40, 50];

export function getCellIndex(hour: number, min: number): number {
  return HOURS.indexOf(hour) * MINUTES.length + MINUTES.indexOf(min);
}

export function getTimeByCellIndex(idx: number): { hour: number; min: number } {
  const hour = HOURS[Math.floor(idx / MINUTES.length)];
  const min = MINUTES[idx % MINUTES.length];
  return { hour, min };
}

export function getItemCellIndexes(timeTableEntry: TimeTableEntry): number[] {
  const start = new Date(timeTableEntry.entry.startAt);
  const startIdx = getCellIndex(start.getHours(), start.getMinutes());
  const cellCount = Math.ceil(timeTableEntry.entry.duration / 10);
  return Array.from({ length: cellCount }, (_, i) => startIdx + i);
}

export function buildCellItemMap(
  timeTableEntries: TimeTableEntry[],
  getIndexes: (timeTableEntries: TimeTableEntry) => number[]
): Record<number, TimeTableEntry> {
  const map: Record<number, TimeTableEntry> = {};
  timeTableEntries.forEach((timeTableEntry) => {
    getIndexes(timeTableEntry).forEach((idx) => {
      map[idx] = timeTableEntry;
    });
  });
  return map;
}
