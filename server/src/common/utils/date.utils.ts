import { addDays, startOfWeek } from "date-fns";

export function getDayRange(dateInput: Date | string): { start: Date; end: Date } {
  const date = new Date(dateInput);

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function getWeekRange(dateInput: Date | string): { start: Date; end: Date } {
  const date = new Date(dateInput);

  const start = startOfWeek(date, { weekStartsOn: 0 }); // 일요일 기준
  const end = addDays(start, 7);

  return { start, end };
}
