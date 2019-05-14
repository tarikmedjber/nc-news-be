const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticlesById
} = require("../controllers/articlesController");

articlesRouter.route("/").get(getArticles);
articlesRouter.route("/:article_id").get(getArticlesById);

module.exports = { articlesRouter };
