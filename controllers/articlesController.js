const { selectArticles } = require("../models/articlesModel");

exports.getArticles = (req, res, next) => {
  selectArticles(req.query).then(articles => {
    res.status(200).send({ articles });
  });
};
