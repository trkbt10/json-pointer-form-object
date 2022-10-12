export function isElementDisabled(element: Element): boolean {
  if (element.hasAttribute("disabled")) {
    return true;
  }
  if (element.ariaDisabled === "true") {
    return true;
  }
  return false;
}
