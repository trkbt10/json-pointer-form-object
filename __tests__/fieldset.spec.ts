import { JSDOM } from "jsdom";
import { formToObject } from "../src";
describe("fieldset", () => {
  const jsdom = new JSDOM();
  const document = jsdom.window.document;
  it("should succeed", () => {
    const source = `
    <fieldset>
      <legend>Choose your favorite monster</legend>
  
      <input type="radio" id="kraken" name="monster" value="K">
      <label for="kraken">Kraken</label><br>
  
      <input type="radio" id="sasquatch" name="monster" value="S" checked>
      <label for="sasquatch">Sasquatch</label><br>
  
      <input type="radio" id="mothman" name="monster" value="M" />
      <label for="mothman">Mothman</label>
    </fieldset>
    `;
    const formElement = document.createElement("form");
    formElement.innerHTML = source;
    expect(formToObject(formElement)).toStrictEqual({
      monster: "S",
    });
  });
  it("not included if the fieldset is disabled", () => {
    const source = `
    <fieldset disabled>
      <legend>Disabled login fieldset</legend>
      <div>
        <label for="name">Name: </label>
        <input type="text" name="name" value="Chris" />
      </div>
      <div>
        <label for="pwd">Archetype: </label>
        <input type="password" name="pwd" value="Wookie" />
      </div>
    </fieldset>
    `;
    const formElement = document.createElement("form");
    formElement.innerHTML = source;
    expect(formToObject(formElement)).toStrictEqual({});
  });
  it("should not be included if it is nested in DISABLED", () => {
    const source = `
      <input type="text" name="0" value="0" />
      <fieldset>
        <input type="text" name="1" value="1" />
        <fieldset>
          <input type="text" name="2" value="2" />
          <fieldset disabled>
            <input type="text" name="3.0" value="3.0" />
            <fieldset>
              <input type="text" name="4" value="4" />
            </fieldset>
          </fieldset>
          <fieldset>
            <input type="text" name="3.1" value="3.1" />
          </fieldset>
        </fieldset>
      </fieldset>
    `;
    const formElement = document.createElement("form");
    formElement.innerHTML = source;
    expect(formToObject(formElement)).toStrictEqual({
      "0": "0",
      "1": "1",
      "2": "2",
      "3.1": "3.1",
    });
  });
});
