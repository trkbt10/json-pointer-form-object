import { convertFormDataToJson } from "../src";

describe("convertFormDataToJson", () => {
  it("should convert FormData to JSON", () => {
    const formData = new FormData();
    formData.append("user/name", "John Doe");
    formData.append("user/email", "john.doe@example.com");
    formData.append("preferences/language", "en");

    const jsonObject = convertFormDataToJson(formData);
    expect(jsonObject).toEqual({
      user: {
        name: "John Doe",
        email: "john.doe@example.com",
      },
      preferences: {
        language: "en",
      },
    });
  });
});
