export function isTextAreaElement(
  elm: HTMLElement | any
): elm is HTMLTextAreaElement {
  return typeof HTMLTextAreaElement === "undefined"
    ? elm?.tagName === "TEXTAREA"
    : elm instanceof HTMLTextAreaElement;
}
