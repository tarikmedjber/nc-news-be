const { selectTopics, selectTopicsBySlug } = require("../models/topicsModel");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then(topics => {
      if (topics.length < 1)
        return Promise.reject({ code: 404, msg: "404 - Route not found!" });
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getSpecificTopic = (req, res, next) => {
  const { topic } = req.params;
  selectTopicsBySlug(topic).then(topics => {
    if (topics.length < 1) return Promise.reject({ code: 404 });
    else res.status(200).send({ topics });
  });
};
