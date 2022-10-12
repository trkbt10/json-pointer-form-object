import { set } from "immutable-json-pointer";
import { getAllInputElements } from "./getAllInputElements";
import { isElementDisabled } from "./isElementDisabled";
import { isFieldsetElement } from "./isFieldsetElement";
import { isInputElement } from "./isInputElement";
import { isSelectElement } from "./isSelectElement";
import { isTextAreaElement } from "./isTextAreaElement";
import { normalizeHTMLInputElementValue } from "./normalizeHTMLInputElementValue";

export function formToObject<T extends {} = {}>(sourceElement: Element): T {
  return getAllInputElements(sourceElement).reduce<{}>((acc, c) => {
    if (isElementDisabled(c)) {
      return acc;
    }
    if (isFieldsetElement(c)) {
      const value = formToObject(c);
      return { ...acc, ...value };
    }
    const name = `${c.name.startsWith("/") ? "" : "/"}${c.name}`;
    if (isInputElement(c)) {
      const value = normalizeHTMLInputElementValue(c);
      if (typeof value === "undefined") {
        return acc;
      }
      return set(acc, name, value);
    }
    if (isTextAreaElement(c)) {
      return set(acc, name, c.value);
    }
    // SelectBox
    if (isSelectElement(c)) {
      if (c.multiple) {
        const values = Array.from(c.selectedOptions).map((option) => {
          return option.value;
        });
        return set(acc, name, values);
      }
      return set(acc, name, c.value);
    }
    const value = c.getAttribute("value");
    if (value) {
      return set(acc, name, value);
    }
    return acc;
  }, {}) as T;
}
