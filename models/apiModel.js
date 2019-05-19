const file = "utils/endpoints/endpoints.json",
  fs = require("fs");
const getEndpoints = cb => {
  fs.readFile(file, "utf8", (err, fd) => {
    if (err) return Promise.reject({ code: 404 });
    else {
      let parse = JSON.parse(fd);
      cb(err, parse);
    }
  });
};

module.exports = { getEndpoints };
