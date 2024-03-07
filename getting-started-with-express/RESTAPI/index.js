const express = require("express");
const app = express();
const fs = require("fs");
let users = require("./user_data/users.json");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Middlewares)
app.use(express.urlencoded({ extended: true }));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Index route)
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new route)
app.post("/api/users", (req, res) => {
  //sending user_details through postman
  let user_details = req.body;

  //appending user_details into users array
  users.push({ id: users.length + 1, ...user_details });

  //converting users into JSON compatible format
  users = JSON.stringify(users);

  //writing into users.json file
  fs.writeFile("./user_data/users.json", users, (error) => {
    if (error) {
      return res.status(500).json({ error: "Failed to add user_details!" });
    }
    return res.json({ success: "user_details added successfully!" });
  });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show route)
app.get("/api/users/:id", (req, res) => {
  let { id } = req.params;
  let user = users.find((user) => user.id === parseInt(id));
  return res.json(user);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(patch/update route)
app.patch("/api/users/:id", (req, res) => {
  let id = parseInt(req.params.id);

  //our desired user from postman
  let desired_user = req.body;

  //our existing user
  let user = users.find((user) => user.id === id);

  //let's update our existing user
  user = { id, ...desired_user };

  //let's update our users array
  let particular_index = users.findIndex((user) => user.id === id);
  if (particular_index !== -1) {
    users[particular_index] = user;
  }

  //converting users into JSON compatible format
  users = JSON.stringify(users);

  //writing into users.json file
  fs.writeFile("./user_data/users.json", users, (error) => {
    if (error) {
      return res.status(500).json({ error: "Failed to update user_details!" });
    }
    return res.json({ success: "user_details updated successfully!" });
  });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete route)
app.delete("/api/users/:id", (req, res) => {
  let { id } = req.params;

  //let's delete our user
  users = users.filter((user) => user.id !== parseInt(id));

  //converting users into JSON compatible format
  users = JSON.stringify(users);

  //writing into users.json file
  fs.writeFile("./user_data/users.json", users, (error) => {
    if (error) {
      return res.status(500).json({ error: "delete operation failed!" });
    }
    return res.json({ success: "user_details deleted successfully!" });
  });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(3000, () => {
  console.log("server is active on port: 3000");
});
