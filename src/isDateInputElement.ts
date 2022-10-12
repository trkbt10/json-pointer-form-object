import { isInputElement } from "./isInputElement";

export function isDateInputElement(elm: HTMLElement) {
  if (!isInputElement(elm)) {
    return false;
  }
  return (
    elm.type === "date" ||
    elm.type === "datetime-local" ||
    elm.type === "month" ||
    elm.type === "time"
  );
}
