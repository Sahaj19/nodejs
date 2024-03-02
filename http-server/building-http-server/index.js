const http = require("http");
const fs = require("fs");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
Create an HTTP server that logs request details to a file and returns predefined
 responses for specific URLs.
*/

const myServer = http.createServer((req, res) => {
  //Log details
  let logEntry = `${Date.now()} - ${req.url} \n`;

  //log details will be appended in my log.txt file
  fs.appendFile("./log.txt", logEntry, (error) => {
    if (error) {
      console.error("Error appending to log file:", error);
      res.end("Internal Server Error");
      return;
    }

    // Handle requests based on URL
    if (req.url === "/") {
      res.end("HOMEPAGE");
    } else if (req.url === "/about") {
      res.end("ABOUT PAGE");
    } else if (req.url === "/contact") {
      res.end("CONTACT PAGE");
    } else {
      res.end("404 - Page Not Found!");
    }
  });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
myServer.listen(3000, () => {
  console.log("server is active on port : 3000");
});
