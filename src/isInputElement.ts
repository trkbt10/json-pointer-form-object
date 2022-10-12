export function isInputElement(
  elm: HTMLElement | any
): elm is HTMLInputElement {
  return typeof HTMLInputElement === "undefined"
    ? elm?.tagName === "INPUT"
    : elm instanceof HTMLInputElement;
}
