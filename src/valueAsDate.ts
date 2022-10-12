export function valueAsDate(
  value: string | number | null | Date
): Date | undefined {
  if (typeof value === "string") {
    return new Date(value);
  }
  if (typeof value === "number") {
    return new Date(value);
  }
  if (value instanceof Date) {
    return value;
  }
  return;
}
