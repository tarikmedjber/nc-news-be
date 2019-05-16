const { selectUsersByUsername } = require("../models/usersModel");

exports.getUsersByUsername = (req, res, next) => {
  const { username } = req.params;
  selectUsersByUsername(username)
    .then(users => {
      if (users.length < 1) return Promise.reject();
      res.status(200).send({ users });
    })
    .catch(next);
};
