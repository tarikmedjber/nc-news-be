const { patchCommentVotes, deleteComment } = require("../models/commentsModel");

exports.updateCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { votes } = req.body;
  patchCommentVotes(comment_id, votes)
    .then(updatedCommentVote => {
      if (updatedCommentVote.length < 1) return Promise.reject(400);
      res.status(200).send(updatedCommentVote);
    })
    .catch(next);
};

exports.deleteByCommentId = (req, res, next) => {
  const { comment_id } = req.params;

  deleteComment(comment_id)
    .then(deletedComment => {
      if (deletedComment.length > 0) return Promise.reject(400);

      res.status(204).send({ deletedComment });
    })
    .catch(next);
};
