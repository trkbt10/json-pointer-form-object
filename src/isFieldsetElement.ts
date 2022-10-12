export function isFieldsetElement(
  elm: HTMLElement | any
): elm is HTMLFieldSetElement {
  return typeof HTMLFieldSetElement === "undefined"
    ? elm?.tagName === "FIELDSET"
    : elm instanceof HTMLFieldSetElement;
}
