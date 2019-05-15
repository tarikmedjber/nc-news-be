const usersRouter = require("express").Router();
const { getUsersByUsername } = require("../controllers/usersController");

usersRouter.route("/:username").get(getUsersByUsername);

module.exports = { usersRouter };
