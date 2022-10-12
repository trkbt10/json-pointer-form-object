import { JSDOM } from "jsdom";
import { formToObject } from "../src";
describe("checkbox", () => {
  const jsdom = new JSDOM();
  const document = jsdom.window.document;
  it("HTMLInputElement[type=checkbox]", () => {
    const source = `
      <fieldset>
        <legend>Choose your monster's features:</legend>

        <div>
          <input type="checkbox" id="scales" name="scales" checked>
          <label for="scales">Scales</label>
        </div>

        <div>
          <input type="checkbox" id="horns" name="horns">
          <label for="horns">Horns</label>
        </div>
      </fieldset>
    `;
    const formElement = document.createElement("form");
    formElement.innerHTML = source;
    expect(formToObject(formElement)).toStrictEqual({
      horns: false,
      scales: true,
    });
  });
});
