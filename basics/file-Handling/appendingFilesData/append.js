const fs = require("fs");

//run it once and then comment
fs.writeFileSync("./file1.txt", "hello1");

//it will append (will not overwrite)
fs.appendFileSync("./file1.txt", "-hello2\n");
