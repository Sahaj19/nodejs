const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  indexRoute,
  newUserRoute,
  createUserRoute,
  showUserRoute,
  editUserRoute,
  updateUserRoute,
  deleteUserRoute,
} = require("../controllers/user.js");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(index route)
router.get("/", indexRoute);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new route)
router.get("/new", newUserRoute);

//(post route)
router.post("/", createUserRoute);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show route)
router.get("/:id", showUserRoute);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(edit route)
router.get("/:id/edit", editUserRoute);

//(update route)
router.patch("/:id", updateUserRoute);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete route)
router.delete("/:id", deleteUserRoute);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = router;
