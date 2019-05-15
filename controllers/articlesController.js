const {
  selectArticles,
  selectArticlesById,
  newUpdatedVote,
  selectCommentsById,
  postNewComment
} = require("../models/articlesModel");

exports.getArticles = (req, res, next) => {
  selectArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then(articleById => {
      res.status(200).send({ articleById });
    })
    .catch(next);
};

exports.updateArticleVotes = (req, res, next) => {
  const { votes } = req.body;
  const { article_id } = req.params;
  newUpdatedVote(article_id, votes)
    .then(updatedArticle => {
      res.status(201).send(updatedArticle);
    })
    .catch(next);
};

exports.getCommentsbyArticleId = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsById(article_id, req.query)
    .then(commentsByArticleId => {
      res.status(200).send({ commentsByArticleId });
    })
    .catch(next);
};

exports.addNewComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const newComment = { article_id, author: username, body };
  postNewComment(newComment)
    .then(postedComment => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};
