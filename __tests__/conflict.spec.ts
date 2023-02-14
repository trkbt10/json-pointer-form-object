import { formToObject } from "../src";
import { JSDOM } from "jsdom";

import { compile } from "immutable-json-pointer";
describe("conflict", () => {
  const jsdom = new JSDOM();
  const document = jsdom.window.document;
  it("it should be able to handle conflicts", () => {
    const formElement = document.createElement("form");
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.value = "text";
    inputElement.name = compile(["conflict"]);
    const inputElement2 = document.createElement("input");
    inputElement2.type = "text";
    inputElement2.value = "array";
    inputElement2.name = compile(["conflict", "0"]);
    formElement.appendChild(inputElement);
    formElement.appendChild(inputElement2);
    expect(formToObject(formElement)).toEqual({
      "0": {
        "#": "text",
        "0": "array",
      },
      conflict: "text",
    });
  });
});
