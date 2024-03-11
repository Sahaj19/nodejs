const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync.js");
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
router.post("/", wrapAsync(createUserRoute));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show route)
router.get("/:id", wrapAsync(showUserRoute));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(edit route)
router.get("/:id/edit", wrapAsync(editUserRoute));

//(update route)
router.patch("/:id", wrapAsync(updateUserRoute));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete route)
router.delete("/:id", wrapAsync(deleteUserRoute));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = router;
