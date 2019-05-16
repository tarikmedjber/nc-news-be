const express = require("express");
const apiRouter = require("./routes/api");
const {
  handle404,
  handle405,
  handle400,
  handle500,
  routeNotFound
} = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(handle400);
app.use(handle404);
app.use(handle500);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found!" });
});

module.exports = app;
