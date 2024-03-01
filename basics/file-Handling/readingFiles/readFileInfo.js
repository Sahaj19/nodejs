const fs = require("fs");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Reading files synchronously
try {
  const result = fs.readFileSync("./info.txt", "utf-8");
  console.log(result);
} catch (error) {
  console.log("Something went wrong ", error);
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Reading files asynchronously
fs.readFile("./info.txt", "utf-8", (error, result) => {
  if (error) {
    console.log("Something went wrong ", error);
  } else {
    console.log(result);
  }
});
