export function getDayRange(dateInput: Date | string): { start: Date; end: Date } {
  const date = new Date(dateInput);

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}
