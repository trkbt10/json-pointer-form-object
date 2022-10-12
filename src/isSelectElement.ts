export function isSelectElement(
  elm: HTMLElement | any
): elm is HTMLSelectElement {
  return typeof HTMLSelectElement === "undefined"
    ? elm?.tagName === "SELECT"
    : elm instanceof HTMLSelectElement;
}
