const { patchCommentVotes, deleteComment } = require("../models/commentsModel");

exports.updateCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { votes } = req.body;
  if (
    !Object.keys(req.body).includes("votes") &&
    Object.keys(req.body).length > 0
  )
    next({ code: 400 });
  else
    patchCommentVotes(comment_id, votes)
      .then(([comment]) => {
        if (!comment) return Promise.reject({ code: 404 });
        res.status(200).send({ comment });
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
