exports.methodNotAllowed = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};
exports.handle400 = (err, req, res, next) => {
  const codes = {
    "23502": "violates not null violation",
    "22P02": "invalid input syntax for type integer"
  };
  if (codes[err.code]) res.status(400).send({ msg: "Bad request" });
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  const codes = {
    "23503": "violates foreign key constraint",
    404: "route does not exist"
  };
  if (codes[err.code]) res.status(404).send({ msg: "Route not found!" });
  else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
