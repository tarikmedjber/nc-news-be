const connection = require("../db/connection");

const selectTopics = () => {
  return connection("topics")
    .from("topics")
    .returning("*");
};

module.exports = { selectTopics };
