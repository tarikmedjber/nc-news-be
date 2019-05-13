const { topicData, userData, articleData, commentData } = require("../data");
const { createdAtConverter } = require("../../utils/created_at_converter");
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
      // chnanging belongs_to to the article id
      // and then change the key of created_by to author

      return knex("comments")
        .insert(newCommentData)
        .returning("*");
    });
};
