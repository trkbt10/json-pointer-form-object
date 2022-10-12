const targetElementNodeNameSet = new Set([
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "FIELDSET",
]);
export function getAllInputElements(element: Element): Element[] {
  const selectedElements: Element[] = [];
  for (const childElement of Array.from(element.children)) {
    if (targetElementNodeNameSet.has(childElement.nodeName)) {
      selectedElements.push(childElement);
    } else {
      selectedElements.push(...getAllInputElements(childElement));
    }
  }
  return selectedElements;
}
