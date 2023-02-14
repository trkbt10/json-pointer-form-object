# json-pointer-form-object

This is a library that converts an HTMLFormElement into an Object and returns it.

It is also possible to construct complex objects by specifying a JSONPointer in the NAME attribute of a child element of HTMLFormElement

## Install

```bash
$ npm install json-pointer-form-object
```

## Usage

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
