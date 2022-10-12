import { JSDOM } from "jsdom";
import { formToObject } from "../src";
describe("date", () => {
  const jsdom = new JSDOM();
  const document = jsdom.window.document;
  it("HTMLInputElement[type=date]", () => {
    const expected = "2018-07-22";
    const source = `
    <label for="start">Start date:</label>

    <input type="date" id="start" name="trip-start"
      value="${expected}"
      min="2018-01-01" max="2018-12-31">
    
    `;
    const formElement = document.createElement("form");
    formElement.innerHTML = source;
    expect(formToObject(formElement)).toStrictEqual({
      "trip-start": new Date(`${expected}`),
    });
  });
  it("HTMLInputElement[type=datetime-local]", () => {
    const expected = "2018-06-12T19:30";
    const source = `
    <label for="meeting-time">Choose a time for your appointment:</label>

    <input type="datetime-local" id="meeting-time"
          name="meeting-time" value="2018-06-12T19:30"
          min="2018-06-07T00:00" max="2018-06-14T00:00">
    `;
    const formElement = document.createElement("form");
    formElement.innerHTML = source;
    expect(formToObject(formElement)).toStrictEqual({
      "meeting-time": new Date(`${expected}`),
    });
  });
});
