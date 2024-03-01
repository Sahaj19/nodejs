const fs = require("fs");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Creating files synchronously
fs.writeFileSync("./example.txt", "hello there from sync file");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Creating files asynchronously
fs.writeFile("./example.txt", "hello there from async file", (err) => {});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*
the main difference lies in
how they handle the flow of 
execution and error handling. 

Synchronous writing blocks the 
execution until the operation 
is completed, while asynchronous 
writing allows the program to 
continue executing other tasks 
without waiting for the operation 
to finish.
*/
