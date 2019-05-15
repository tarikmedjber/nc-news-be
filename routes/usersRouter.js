const usersRouter = require("express").Router();
const { getUsersByUsername } = require("../controllers/usersController");
const { methodNotAllowed } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(getUsersByUsername)
  .all(methodNotAllowed);

module.exports = { usersRouter };
