const { topicData, userData, articleData, commentData } = require("../data");
const { createdAtConverter } = require("../../utils/created_at_converter");
const { lookupArticleId, formatComments } = require("../../utils/lookup");
const { swapKeys } = require("../../utils/swap_keys");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicData)
        .returning("*");
    })
    .then(topicRows => {
      return knex("users")
        .insert(userData)
        .returning("*");
    })
    .then(userRows => {
      let newArticleData = createdAtConverter(articleData);

      return knex("articles")
        .insert(newArticleData)
        .returning("*");
    })
    .then(articleRows => {
      let newCommentData = createdAtConverter(commentData);
      let lookupArticle = lookupArticleId(articleRows);
      let formattedComments = formatComments(newCommentData, lookupArticle);
      let commentsDB = swapKeys(formattedComments, "created_by", "author");
      return knex("comments")
        .insert(commentsDB)
        .returning("*");
    });
};
