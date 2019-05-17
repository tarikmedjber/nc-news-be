const connection = require("../db/connection");

const selectTopics = () => {
  return connection("topics")
    .from("topics")
    .returning("*");
};

const selectTopicsBySlug = topic => {
  return connection
    .select("topics")
    .from("topics")
    .where("slug", topic)
    .returning("*");
};

module.exports = { selectTopics, selectTopicsBySlug };
