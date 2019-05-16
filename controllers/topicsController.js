const { selectTopics } = require("../models/topicsModel");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then(topics => {
      if (topics.length < 1)
        return Promise.reject({ code: 404, msg: "404 - Route not found!" });
      res.status(200).send({ topics });
    })
    .catch(next);
};
