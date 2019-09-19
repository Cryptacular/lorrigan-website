const fs = require("fs"),
  path = require("path");

module.exports = (req, res) => {
  fs.readFile(path.resolve(__dirname, "../assets/games.json"), (err, data) => {
    if (err) {
      return res.status(err.status || 500).send();
    }

    res.send(data);
  });
};
