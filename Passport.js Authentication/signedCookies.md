## `app.use(cookieParser("SECRET"));`

- Here, it's initialized with a secret key ("SECRET").
- This secret key is used to sign the cookies, providing integrity and authenticity checks.
- Without this key, it's impossible to verify the integrity of signed cookies.

## `res.cookie("name", "sahaj", { signed: true });`

- <strong>If no tampering has occurred:</strong> The logged output will be `{ name: 'sahaj' }` indicating that the cookie "name" with value "sahaj" is intact and not tampered with.

- <strong>If tampering has occurred:</strong> The logged output will be `{ name: false }` indicating that the cookie "name" has been tampered with, and its value is not trustworthy.

<strong>{ key: false }</strong>
- If the cookie key itself is tampered with, it will result in false.

<strong>{ value: false }</strong>
- If the cookie value is tampered with, it will result in false.

<strong>{ }</strong>
- If the entire value of the cookie is changed or removed, it will result in an empty object.


```javascript
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = 3000;

app.use(cookieParser("SECRET"));

app.get("/create-cookies", function (req, res) {
  res.cookie("name", "sahaj", { signed: true });
  res.send("signed cookies created");
});

app.get("/get-cookies", function (req, res) {
  console.log(req.signedCookies);
  console.log(req.cookies);
  res.send("received");
});

app.listen(port, function () {
  console.log(`server is active on port : ${port}`);
});
```