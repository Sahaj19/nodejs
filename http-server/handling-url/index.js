const http = require("http");
const fs = require("fs");
const url = require("url");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const myServer = http.createServer((req, res) => {
  //ignore favicon route
  if (req.url === "/favicon.ico") {
    return res.end();
  }

  //log entries
  const logEntry = `${Date.now()} - ${req.url} \n`;

  //parsing of url
  //const myURL = url.parse(req.url);

  //true - for parsing query parameters
  const myURL = url.parse(req.url, true);
  console.log(myURL);

  fs.appendFile("./log.txt", logEntry, (error) => {
    //server error
    if (error) {
      console.log("Error occurred ", error);
      return res.end("Internal server error");
    }

    //route handler
    switch (myURL.pathname) {
      case "/": {
        res.end("HOMEPAGE");
        break;
      }
      case "/about": {
        /*
          search query - '?name=sahaj&age=21&sex=male'
        */

        /*
          query : { name: 'sahaj', age: '21', sex: 'male' };
        */

        let username = myURL.query.name;
        let userage = myURL.query.age;
        let usersex = myURL.query.sex;
        res.end(`Hello ${username} , ${userage} , ${usersex}`);
        break;
      }

      //youtube search_query working
      case "/search": {
        /*
        search query - ?search_query=sahaj+arora+21
        */

        /*
        query : { search_query : "javascript" };
        */

        let result = myURL.query.search_query;
        res.end(`Here are your results for ${result}`);
        break;
      }
      default: {
        res.end("404 - Page not found!");
      }
    }
  });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
myServer.listen(3000, () => {
  console.log("server is active on port-3000");
});
