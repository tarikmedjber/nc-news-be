const connection = require("../db/connection");

const patchCommentVotes = (comment_id, votes = 0) => {
  if (typeof votes !== "number") return Promise.reject({ code: 400 });
  else
    return connection
      .increment({ votes })
      .into("comments")
      .where({ comment_id })
      .returning("*");
};

const deleteComment = comment_id => {
  return connection("comments")
    .from("comments")
    .where({ comment_id })
    .del();
};

module.exports = { patchCommentVotes, deleteComment };
