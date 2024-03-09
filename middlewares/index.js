const express = require("express");
const app = express();
let users = require("./users.json");
const fs = require("fs");
const port = 3000;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(middlewares)
app.use(express.urlencoded({ extended: true }));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(index route)
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(post route)
app.post("/api/users", (req, res) => {
  try {
    //our new user
    let newUser = req.body;

    //let's insert our user into our users array
    users.push({ id: users.length + 1, ...newUser });

    //let's convert our users data into fs comaptible data
    users = JSON.stringify(users);

    //let's append our new user
    fs.writeFile("./users.json", users, (error) => {
      if (error) {
        return res.status(500).json({ error: "Failed to append new user" });
      }
      return res
        .status(200)
        .json({ success: "new user inserted successfully!" });
    });
  } catch (error) {
    res.status(500).json({ error: "something went wrong!" });
  }
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show route)
app.get("/api/users/:id", (req, res) => {
  let id = Number(req.params.id);

  let desired_user = users.find((user) => {
    return user.id === id;
  });

  if (!desired_user) {
    return res.status(400).json({ error: "user doesn't exist!" });
  }

  return res.status(200).json(desired_user);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(update route)
app.patch("/api/users/:id", (req, res) => {
  let id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: "Invalid Id" });
  }

  //user from our array
  let original_user = users.find((user) => {
    return user.id === id;
  });

  //user from our form
  let updated_user = req.body;

  //updating our array user
  original_user = { id, ...updated_user };

  //updating our array itself
  let required_index = users.findIndex((user) => {
    return user.id === id;
  });

  if (required_index === -1) {
    return res.status(400).json({ error: "updation operation failed!" });
  }

  users[required_index] = original_user;

  //let's convert our users data into fs comaptible data
  users = JSON.stringify(users);

  //let's write into our file
  fs.writeFile("./users.json", users, (error) => {
    if (error) {
      return res.status(500).json({ error: "updation operation failed!" });
    }
    return res.status(200).json({ success: "user updated successfully!" });
  });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete route)
app.delete("/api/users/:id", (req, res) => {
  try {
    let id = Number(req.params.id);

    //handling id type error
    if (!id) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    //let's filter our users array
    let required_index = users.findIndex((user) => {
      return user.id === id;
    });

    if (required_index === -1) {
      return res.status(404).json({ error: "user doesn't exist!" });
    }

    users.splice(required_index, 1);

    //let's convert our users data into fs comaptible data
    users = JSON.stringify(users);

    //let's delete our user
    fs.writeFile("./users.json", users, (error) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Failed to delete requested user" });
      }
      return res.status(204).json({ success: "user deleted successfully!" });
    });
  } catch (error) {
    res.status(500).json({ error: "something went wrong!" });
  }
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.all("*", (req, res, next) => {
  return res.status(404).json({ error: "Page Not Found!" });
});

app.use((err, req, res, next) => {
  return res.status(500).json({ error: "Something went wrong!" });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(port, function () {
  console.log(`server is active on port : ${port}`);
});
