const connection = require("../db/connection");

const selectArticles = ({
  sort_by = "created_at",
  order = "desc",
  author,
  topic
}) => {
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
    })
    .then(articles => {
      return articles;
    });
};

const selectArticlesById = article_id => {
  return connection
    .select("*")
    .count("comments.article_id as comment_count")
    .join("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("comments.comment_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", article_id)
    .from("articles")
    .returning("*");
};

module.exports = { selectArticles, selectArticlesById };
