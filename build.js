var fs = require("fs"),
  path = require("path"),
  pug = require("pug");

var html = pug.renderFile("views/index.pug", {
  year: new Date().getFullYear()
});

fs.writeFileSync(path.resolve(__dirname, "public/index.html"), html);
