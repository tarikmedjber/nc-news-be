const {
  selectArticles,
  selectArticlesById
} = require("../models/articlesModel");

exports.getArticles = (req, res, next) => {
  selectArticles(req.query).then(articles => {
    res.status(200).send({ articles });
  });
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id).then(articleById => {
    res.status(200).send({ articleById });
  });
};
