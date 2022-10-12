import { isDateInputElement } from "./isDateInputElement";
import { valueAsDate } from "./valueAsDate";
import { valueAsNumber } from "./valueAsNumber";

export function normalizeHTMLInputElementValue(c: HTMLInputElement) {
  // Boolean
  if (c.type === "checkbox") {
    return c.checked;
  }
  // Radio button
  if (c.type === "radio") {
    if (c.checked) {
      return c.value;
    }
    return;
  }
  // Files
  if (c.type === "file") {
    const files = c.files || [];
    if (c.multiple) {
      return files;
    } else {
      return files[0] ?? null;
    }
  }
  // Date
  if (isDateInputElement(c)) {
    return valueAsDate(c.value);
  }
  // Numeric
  if (c.type === "number") {
    return valueAsNumber(c.value);
  }
  // Range
  if (c.type === "range") {
    return valueAsNumber(c.value);
  }
  return c.value;
}
