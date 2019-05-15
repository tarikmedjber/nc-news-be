const connection = require("../db/connection");

const selectUsersByUsername = username => {
  return connection("users")
    .where({ username })
    .returning("*");
};

module.exports = { selectUsersByUsername };
