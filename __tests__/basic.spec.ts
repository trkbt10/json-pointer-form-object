import { JSDOM } from "jsdom";
import { formToObject } from "../src/formToObject";
import { compile } from "immutable-json-pointer";
describe("basic", () => {
  const jsdom = new JSDOM();
  const document = jsdom.window.document;
  it("HTMLInputElement", () => {
    const formElement = document.createElement("form");
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.value = "world";
    inputElement.name = compile(["hello"]);
    formElement.appendChild(inputElement);
    expect(formToObject(formElement)).toEqual({ hello: "world" });
  });
  it("HTMLInputElement[type=number]", () => {
    const formElement = document.createElement("form");
    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.value = "1";
    inputElement.name = compile(["1"]);
    formElement.appendChild(inputElement);
    expect(formToObject(formElement)).toEqual({ "1": 1 });
  });
  it("HTMLInputElement[type=radio]", () => {
    const formElement = document.createElement("form");
    const source = {
      truthy: "truthy",
      falsy: "falsy",
    };
    Object.entries(source).forEach(([key, value]) => {
      const inputElement = document.createElement("input");
      inputElement.type = "radio";
      inputElement.value = value;
      inputElement.name = "/radio";
      if (value === "truthy") {
        inputElement.checked = true;
      }

      formElement.appendChild(inputElement);
    });
    expect(formToObject(formElement)).toStrictEqual({
      radio: "truthy",
    });
  });
  it("HTMLTextareaElement", () => {
    const formElement = document.createElement("form");
    const inputElement = document.createElement("textarea");
    inputElement.value = "world";
    inputElement.name = compile(["hello"]);
    formElement.appendChild(inputElement);
    expect(formToObject(formElement)).toEqual({ hello: "world" });
  });
  it("HTMLSelectboxElement", () => {
    const formElement = document.createElement("form");
    const selectElement = document.createElement("select");
    const options = ["a", "b", "c"];
    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.text = option;
      selectElement.appendChild(optionElement);
    });
    selectElement.name = compile(["select"]);
    selectElement.value = "b";
    formElement.appendChild(selectElement);

    expect(formToObject(formElement)).toEqual({ select: "b" });
  });
  it("HTMLSelectboxElement[multiple]", () => {
    const formElement = document.createElement("form");
    const selectElement = document.createElement("select");
    selectElement.multiple = true;
    const options = ["a", "b", "c"];
    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.text = option;
      if (option !== "a") {
        optionElement.selected = true;
      }
      selectElement.appendChild(optionElement);
    });
    selectElement.name = compile(["select"]);
    formElement.appendChild(selectElement);

    expect(formToObject(formElement)).toStrictEqual({ select: ["b", "c"] });
  });
});
