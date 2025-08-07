export function getBorderClass(
  idx: number,
  startIdx: number,
  endIdx: number,
  columns: number
): string {
  const reverseMod = (x: number, N: number): number => (N - (x % N)) % N;
  const offsetOfStart = startIdx % columns;
  const offsetOfEnd = reverseMod(endIdx + 1, columns);

  const isPartOfBlock = startIdx <= idx && endIdx >= idx;
  const isStartOfBlock = startIdx === idx;
  const isEndOfBlock = endIdx === idx;
  const isLeftOfBlock = isPartOfBlock && idx % columns === 0;
  const isRightOfBlock = isPartOfBlock && idx % columns === columns - 1;
  const isTopOfBlock =
    isPartOfBlock && Math.floor((idx - offsetOfStart) / columns) === Math.floor(startIdx / columns);
  const isBottomOfBlock =
    isPartOfBlock && Math.floor((idx + offsetOfEnd) / columns) === Math.floor(endIdx / columns);

  const classes: string[] = [];

  if (isLeftOfBlock || isStartOfBlock) {
    classes.push("border-l-gray-400", "border-l-2");
  }
  if (isRightOfBlock || isEndOfBlock) {
    classes.push("border-r-gray-400", "border-r-2");
  }
  if (isTopOfBlock || isStartOfBlock) {
    classes.push("border-t-gray-400", "border-t-2");
  }
  if (isBottomOfBlock || isEndOfBlock) {
    classes.push("border-b-gray-400", "border-b-2");
  }

  return classes.join(" ");
}
