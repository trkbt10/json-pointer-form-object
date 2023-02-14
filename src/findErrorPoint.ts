import { compile, has, parse } from "immutable-json-pointer";

export function findErrorPoint(pointer: string, original: {}) {
  const slice = parse(pointer);
  for (let i = slice.length; i >= 0; i--) {
    const subPointer = compile(slice.slice(0, i));
    try {
      if (has(original, subPointer)) {
        return subPointer;
      }
    } catch (e) {
      continue;
    }
  }
  throw new Error("No valid pointer found");
}
