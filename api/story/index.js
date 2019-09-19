const fs = require("fs"),
  path = require("path");

module.exports = (req, res) => {
  fs.readFile(
    path.resolve(__dirname, `../assets/stories/${req.query.id}.md`),
    "utf8",
    (err, data) => {
      if (err) {
        return res.status(err.status || 500).send();
      }

      res.json({ content: data });
    }
  );
};
