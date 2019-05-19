const apiRouter = require("express").Router();

const { topicsRouter } = require("./topicsRouter");
const { articlesRouter } = require("./articlesRouter");
const { commentsRouter } = require("./commentsRouter");
const { usersRouter } = require("./usersRouter");
const { apiController } = require("../controllers/apiController");
const { methodNotAllowed } = require("../errors/index");

//apiRouter.use("/", apiController);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments/", commentsRouter);
apiRouter.use("/users/", usersRouter);
apiRouter
  .route("/")
  .get(apiController)
  .all(methodNotAllowed);
module.exports = apiRouter;
