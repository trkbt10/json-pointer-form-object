import { set } from "immutable-json-pointer";

export function convertFormDataToJson<T extends {} = {}>(
  formData: FormData,
): T {
  const entries = Array.from(formData.entries());
  return entries.reduce<{ [key: string]: string | File }>(
    (acc, [key, value]) =>
      set(acc, key.startsWith("/") ? key : `/${key}`, value),
    {},
  ) as T;
}
