exports.methodNotAllowed = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};
exports.handle400 = (err, req, res, next) => {
  res.status(400).send({ msg: "Bad request" });
};

exports.handle404 = (err, req, res, next) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};
