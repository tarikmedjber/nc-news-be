const { selectUsersByUsername } = require("../models/usersModel");

exports.getUsersByUsername = (req, res, next) => {
  const { username } = req.params;
  selectUsersByUsername(username)
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};
