# json-pointer-form-object

This library allows you to convert FormData into a JSON object using JSON Pointer syntax. It simplifies the process of mapping form data to structured JSON, making it easier to handle and manipulate form submissions in web applications.

Features:

- Easy Conversion: Convert FormData directly into a JSON object.
- JSON Pointer Syntax: Use JSON Pointer to define the structure and hierarchy of the JSON object.
- Flexible Mapping: Supports complex nested objects and arrays.

## Install

```bash
$ npm install json-pointer-form-object
```

## Usage Example

```typescript
import { convertFormDataToJson } from "json-pointer-form-object";
const formData = new FormData();
formData.append('user/name', 'John Doe');
formData.append('user/email', 'john.doe@example.com');
formData.append('preferences/language', 'en');

const jsonObject = convertFormDataToJson(formData);
console.log(jsonObject);
// Output:
// {
//   "user": {
//     "name": "John Doe",
//     "email": "john.doe@example.com"
//   },
//   "preferences": {
//     "language": "en"
//   }
// }
```

This library is particularly useful for developers working with complex form structures and needing to maintain a consistent and organized JSON format.




```typescript
import { formToObject } from "json-pointer-form-object";
const source = `
    <label for="name">Name: </label>
    <input type="text" name="name" value="Name!!!" />
    <label for="address">Address: </label>
    <input type="text" name="address" value="Address!!" />
`;
const formElement = document.createElement("form");
formElement.innerHTML = source;
console.log(formToObject(formElement)); // { name: "Name!!!", address: "Address!!" }
```

```typescript
import { formToObject } from "json-pointer-form-object";
const source = `
  <input type="text" name="items/string" value="string" />
  <input type="number" name="items/number" value="123" />
  <input type="checkbox" name="items/boolean" checked />
  <input type="date" name="items/date" value="2020-01-01T00:00:00" />
`;
const formElement = document.createElement("form");
formElement.innerHTML = source;
console.log(formToObject(formElement)); // { "items": { string: "string", number: 123, boolean: true, date: Date } }
```

### React

```jsx
import * as React from "react";
import { formToObject } from "json-pointer-form-object";

const Form = () => {
  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();
    const data = formToObject(e.target);
    fetch("/target", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // { "a": { "b": {"c": "d" } } }
    });
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="a/b/c" defaultValue="d" />
      <button type="submit">Submit</button>
    </form>
  );
};
```
