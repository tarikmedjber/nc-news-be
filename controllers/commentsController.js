const { patchCommentVotes, deleteComment } = require("../models/commentsModel");

exports.updateCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { votes } = req.body;
  patchCommentVotes(comment_id, votes)
    .then(updatedCommentVote => {
      if (updatedCommentVote.length < 1)
        return Promise.reject({ code: 404, msg: "404 - ID is invalid" });
      res.status(200).send(updatedCommentVote);
    })
    .catch(next);
};

exports.deleteByCommentId = (req, res, next) => {
  const { comment_id } = req.params;

  deleteComment(comment_id)
    .then(deletedComment => {
      if (deletedComment === 1) res.sendStatus(204).send(deletedComment);
      else return Promise.reject({ code: 404, msg: "404 - Route not found!" });
    })
    .catch(next);
};
