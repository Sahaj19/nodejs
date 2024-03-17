# Cookies

## Overview
- Cookies basically gives us a way to store data in the users browser.
- That data could be anything we want, it could be a name, numeric value etc.
- Cookies can also be used to track the internet activity by using services like
google analytics.
- When a request is sent to our server, we can create a cookie in that moment in time and we can decide at that point what data the cookie will hold as well as things like how long the cookie should last inside the browser before it expires and it automatically deleted.
- So the cookie is then sent back to the browser in the server response and the browser registers it, so now that cookie is storing data inside the user's browser.
- Now, every request the browser makes thereafter to the server , it sends whatever cookies we store to the server with that request. and on the server we can access it.
- So this process is the backbone of how we will be authenticating users whereby this cookie holds a JWT to identify a user and when the server sees that they can verify and authenticate them.

## Cookies Options
- `httpOnly : true` and `secure : true` protect the cookie from client-side attacks.
- **maxAge** limits the lifespan of the cookie, reducing the risk of session hijacking.

# Cookie-Parser Middleware

## Overview
The `cookie-parser` middleware in Node.js is a module that parses cookies attached to the client's request object. It extracts cookie information and makes it available in the request object for further processing by your application.

- **Parsing Cookies**: When a client sends a request to the server, it often includes cookies in the request headers. The `cookie-parser` middleware intercepts this request and parses the cookie data, making it accessible in the `req.cookies` object.

- **Setting Cookie Options**: Similar to creating cookies manually, `cookie-parser` allows you to set various options for cookies parsed from the request. These options include properties like `maxAge`, `httpOnly`, and `secure`, which control the cookie's lifespan, accessibility, and security measures.

```javascript
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// Middleware setup
app.use(cookieParser());

// Creating Cookies
app.get('/create-cookies', (req, res) => {
    res.cookie("name" , "sahaj");
	res.send("Cookies created successfully!");
});

// Reading Cookies
app.get('/get-cookies', (req, res) => {
    const cookies = req.cookies;
	console.log(cookies);
	res.send("Cookies read successfully!");
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

```









