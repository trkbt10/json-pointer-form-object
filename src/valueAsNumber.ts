export function valueAsNumber(
  value: string | number | null | Date
): number | undefined {
  if (typeof value === "string") {
    return +value;
  }
  if (typeof value === "number") {
    return value;
  }
  if (value instanceof Date) {
    return value.getTime();
  }
  return;
}
