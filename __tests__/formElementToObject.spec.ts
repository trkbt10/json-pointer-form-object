import { JSDOM } from "jsdom";
import { formToObject } from "../src";
describe("formElementToObject", () => {
  const jsdom = new JSDOM();
  const document = jsdom.window.document;
  it("should succeed", () => {
    const source = `
    <fieldset>
      <input type="text" name="/root/children/0" value="child0"> 
      <input type="text" name="/root/children/1" value="child1"> 
      <input type="text" name="/root/children/2/value" value="child2"> 
      <input type="text" name="/root/children/2/children/0" value="child2-0"> 
    </fieldset>
    `;
    const formElement = document.createElement("form");
    formElement.innerHTML = source;
    expect(formToObject(formElement)).toStrictEqual({
      root: {
        children: {
          "0": "child0",
          "1": "child1",
          "2": {
            value: "child2",
            children: {
              "0": "child2-0",
            },
          },
        },
      },
    });
  });
  it("should succeed", () => {
    const source = `
      <input value="name" name="name">
      <input value="0" name="age">
      <input value="name">
    `;
    const formElement = document.createElement("form");
    formElement.innerHTML = source;
    expect(formToObject(formElement)).toStrictEqual({
      name: "name",
      age: "0",
    });
  });
  it("target attribute", () => {
    const source = `
      <input value="name" name="name" data-name="__name" />
      <input value="0" name="age" data-name="__age" />
    `;
    const formElement = document.createElement("form");
    formElement.innerHTML = source;
    expect(
      formToObject(formElement, {
        attribute: "data-name",
      })
    ).toStrictEqual({
      __name: "name",
      __age: "0",
    });
  });
});
