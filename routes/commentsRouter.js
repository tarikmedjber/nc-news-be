const commentsRouter = require("express").Router();
const {
  updateCommentVotes,
  deleteByCommentId
} = require("../controllers/commentsController");

commentsRouter
  .route("/:comment_id")
  .patch(updateCommentVotes)
  .delete(deleteByCommentId);

module.exports = { commentsRouter };
