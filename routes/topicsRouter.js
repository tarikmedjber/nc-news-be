const topicsRouter = require("express").Router();
const {
  getTopics,
  getSpecificTopic
} = require("../controllers/topicsController");
const { methodNotAllowed } = require("../errors/index");
topicsRouter
  .route("/")
  .get(getTopics)
  .all(methodNotAllowed);

topicsRouter
  .route("/:topic")
  .get(getSpecificTopic)
  .all(methodNotAllowed);

module.exports = { topicsRouter };
