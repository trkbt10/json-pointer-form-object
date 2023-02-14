import { formToObject } from "./formToObject";

export function createFormEventHandler<T extends {}>(
  callback: (data: T) => any
) {
  return (e: SubmitEvent) => {
    if (!(e.target instanceof HTMLFormElement)) {
      return;
    }
    e.preventDefault();
    const data = formToObject<T>(e.target);
    callback(data);
  };
}
