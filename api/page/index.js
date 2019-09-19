const path = require("path"),
  pug = require("pug");

module.exports = (req, res) => {
  const {
    query: { id }
  } = req;

  var html = pug.renderFile(path.resolve(__dirname, `../assets/views/${id || "index"}.pug`), {
    year: new Date().getFullYear()
  });

  res.send(html);
};
