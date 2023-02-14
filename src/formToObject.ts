import { set, get } from "immutable-json-pointer";
import { getAllInputElements } from "./getAllInputElements";
import { isElementDisabled } from "./isElementDisabled";
import { isFieldsetElement } from "./isFieldsetElement";
import { isInputElement } from "./isInputElement";
import { isSelectElement } from "./isSelectElement";
import { isTextAreaElement } from "./isTextAreaElement";
import { normalizeHTMLInputElementValue } from "./normalizeHTMLInputElementValue";
import { findErrorPoint } from "./findErrorPoint";
type ConflictResolver = (
  targetPonter: string,
  original: {},
  current: any,
  next: any,
  localPointer: string
) => any;
export function formToObject<T extends {} = {}>(
  sourceElement: Element,
  options?: {
    conflictResolver?: ConflictResolver;
  }
): T {
  const set = createSetter(options?.conflictResolver);
  return getAllInputElements(sourceElement).reduce<{}>((acc, c) => {
    if (isElementDisabled(c)) {
      return acc;
    }
    if (isFieldsetElement(c)) {
      const value = formToObject(c, options);
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

const defaultConflictResolver: ConflictResolver = (
  pointer,
  original,
  current,
  next,
  localPointer
) => {
  const fallbacked = {
    "#": current,
  };
  return { ...fallbacked, ...next };
};
function createSetter(fallback: ConflictResolver = defaultConflictResolver) {
  return (acc: {}, name: string, nextValue: any) => {
    try {
      return set(acc, name, nextValue);
    } catch (e) {
      if (fallback) {
        const basePointer = findErrorPoint(name, acc);
        const localPointer = name.slice(basePointer.length);
        const localNext = set({}, localPointer, nextValue);
        const current = get(acc, basePointer);
        const fallbacked = fallback(
          name,
          acc,
          current,
          localNext,
          localPointer
        );
        return set(acc, localPointer, fallbacked);
      }
      throw e;
    }
  };
}
