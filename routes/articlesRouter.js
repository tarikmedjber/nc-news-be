const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticlesById,
  updateArticleVotes,
  getCommentsbyArticleId,
  addNewComment
} = require("../controllers/articlesController");
const { methodNotAllowed } = require("../errors/index");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(methodNotAllowed);
articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(updateArticleVotes)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsbyArticleId)
  .post(addNewComment)
  .all(methodNotAllowed);

module.exports = { articlesRouter };
