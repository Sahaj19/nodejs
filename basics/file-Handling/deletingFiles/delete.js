const fs = require("fs");

//step-1 : let's create some data
// fs.writeFileSync("./file.txt", "my data will be deleted soon...");

//step-3 : let's append some data
// fs.appendFileSync("./file.txt", "I will be deleted too");

//step-3 : let's read the data
// const content = fs.readFileSync("./file.txt", "utf-8");
// console.log(content);

//step-4 : This line will delete our file.txt file
fs.unlinkSync("./file.txt");
