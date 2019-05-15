const commentsRouter = require("express").Router();
const {
  updateCommentVotes,
  deleteByCommentId
} = require("../controllers/commentsController");
const { methodNotAllowed } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(updateCommentVotes)
  .delete(deleteByCommentId)
  .all(methodNotAllowed);

module.exports = { commentsRouter };
