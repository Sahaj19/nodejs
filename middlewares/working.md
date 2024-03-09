# Middlewares

- `Middleware` functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

- If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging(make it bold).

```javascript
    //for parsing form data
    app.use(express.urlencoded({ extended : true }));

    //for parsing json data
    app.use(express.json());
```

# HTTP headers

- http headers are an important part of the API request and response as they represent the meta-data 
associated with the API request and response.

- headers carry information for the request and response body.

- Custom headers and built-in headers exist. It's a good practice to prefix custom headers with a capital X.

```javascript
    app.get("/api/users", (req, res) => {
        res.setHeader("X-myname", "sahaj");
        res.send(users);
    });
```

- With every request and response, network packets are associated. While packets contain actual data, they also include additional information on where the request came from, where it should go, and the size of the data present. This information is present in `headers`.

# HTTP status codes

- http response status codes indicate whether a specific http request has been successfully completed or not.

   > success `200-299`

   > client side error `400-499`

   > server side error `500-599`

- Some good practices:

  > 201 - Indicates something new has been created (via POST or PUT).

  > 400 - Bad Request (If the client sends incomplete data).

  > 404 - If the resource does not exist.

  > 500 - If there's an error in server-side logic.