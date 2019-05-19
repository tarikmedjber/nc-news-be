const {
  selectArticles,
  selectArticlesById,
  newUpdatedVote,
  selectCommentsById,
  postNewComment
} = require("../models/articlesModel");
const { selectUsersByUsername } = require("../models/usersModel");
const { selectTopicsBySlug } = require("../models/topicsModel");

exports.getArticles = (req, res, next) => {
  const { author, topic } = req.query;
  if (!author && !topic) {
    selectArticles(req.query)
      .then(articles => {
        if (articles.length < 1) return Promise.reject({ code: 404 });
        res.status(200).send({ articles });
      })
      .catch(next);
  } else
    Promise.all([
      author ? selectUsersByUsername(author) : null,
      topic ? selectTopicsBySlug(topic) : null
    ])

      .then(([author, topics]) => {
        if (author !== null && author.length < 1)
          return Promise.reject({ code: 404 });
        else if (topics !== null && topics.length < 1)
          return Promise.reject({ code: 404 });
        else return selectArticles(req.query);
      })
      .then(articles => {
        if (!articles) return Promise.reject({ code: 404 });
        else res.status(200).send({ articles });
      })
      .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then(article => {
      if (!article)
        return Promise.reject({ code: 404, msg: "404 - Route not found!" });
      else res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticleVotes = (req, res, next) => {
  const { votes } = req.body;
  const { article_id } = req.params;
  newUpdatedVote(article_id, votes)
    .then(([article]) => {
      if (!article)
        return Promise.reject({ code: 404, msg: "404 - Route not found!" });
      else res.status(200).send({ article });
    })
    .catch(next);
};

exports.getCommentsbyArticleId = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then(articles => {
      if (articles !== null && !articles) return Promise.reject({ code: 404 });
      else return selectCommentsById(article_id, req.query);
    })
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.addNewComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const newComment = { article_id, author: username, body };

  postNewComment(newComment)
    .then(([comment]) => {
      if (comment.length < 1)
        return Promise.reject({ code: 404, msg: "404 - Route not found!" });
      else res.status(201).send({ comment });
    })
    .catch(next);
};
