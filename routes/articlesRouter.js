const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticlesById,
  updateArticleVotes,
  getCommentsbyArticleId,
  addNewComment
} = require("../controllers/articlesController");

articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(updateArticleVotes);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsbyArticleId)
  .post(addNewComment);

module.exports = { articlesRouter };
