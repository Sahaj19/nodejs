const fs = require("fs");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Approach-1)
/*
It will copy all the content
from file1.txt and make a new
file and then transfer all the
content from file1.txt to the
new file
*/

// fs.cpSync("./file1.txt", "./file2.txt");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Approach-2)
try {
  const content = fs.readFileSync("./file1.txt", "utf-8");

  fs.writeFileSync("./file3.txt", content);

  console.log("file copied successfully!");
} catch (error) {
  console.log(error);
}
