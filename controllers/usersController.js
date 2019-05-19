const { selectUsersByUsername } = require("../models/usersModel");

exports.getUsersByUsername = (req, res, next) => {
  const { username } = req.params;
  selectUsersByUsername(username)
    .then(([user]) => {
      if (!user)
        return Promise.reject({
          code: 404,
          msg: "404 - Route not found!"
        });
      res.status(200).send({ user });
    })
    .catch(next);
};
