const { getEndpoints } = require("../models/apiModel");

exports.apiController = (req, res, next) => {
  getEndpoints((err, data) => {
    if (err) next(err);
    res.status(200).send({ data });
  });
};
