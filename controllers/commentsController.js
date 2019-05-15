const { patchCommentVotes, deleteComment } = require("../models/commentsModel");

exports.updateCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { votes } = req.body;
  patchCommentVotes(comment_id, votes).then(updatedCommentVote =>
    res.status(200).send(updatedCommentVote)
  );
};

exports.deleteByCommentId = (req, res, next) => {
  const { comment_id } = req.params;

  deleteComment(comment_id).then(deletedComment => {
    res.status(204).send({ deletedComment });
  });
};
