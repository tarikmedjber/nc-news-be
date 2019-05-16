const connection = require("../db/connection");

const selectArticles = ({
  sort_by = "created_at",
  order = "desc",
  author,
  topic
}) => {
  if (order !== "asc" && order !== "desc" && order !== undefined)
    return Promise.reject({ code: 400 });
  return connection
    .select(
      "articles.author",
      "title",
      "articles.article_id",
      "topic",
      "articles.created_at",
      "articles.votes"
    )
    .count("comments.article_id as comment_count")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .from("articles")
    .orderBy(sort_by, order)
    .where(query => {
      if (author) query.where("articles.author", "=", author);
      if (topic) query.where({ topic });
    });
};

const selectArticlesById = article_id => {
  return connection
    .select(
      "articles.author",
      "title",
      "articles.article_id",
      "topic",
      "articles.body",
      "articles.created_at",
      "articles.votes"
    )
    .count("comments.article_id as comment_count")
    .join("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", article_id)
    .from("articles");
};

const newUpdatedVote = (article_id, votes) => {
  if (typeof votes !== "number")
    return Promise.reject({ code: 400, msg: "this is not a number" });
  else
    return connection
      .increment({ votes })
      .into("articles")
      .where({ article_id })
      .returning("*");
};

const selectCommentsById = (
  article_id,
  { sort_by = "created_at", order = "desc" }
) => {
  if (order !== "asc" && order !== "desc" && order !== undefined)
    return connection
      .select("*")
      .where({ article_id })
      .orderBy(sort_by, order)
      .from("comments")
      .returning("*");
};

const postNewComment = newComment => {
  return connection
    .into("comments")
    .insert(newComment)
    .returning("*");
};

module.exports = {
  selectArticles,
  selectArticlesById,
  newUpdatedVote,
  selectCommentsById,
  postNewComment
};
