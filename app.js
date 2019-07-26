var path = require("path"),
  express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

global.appRoot = path.resolve(__dirname);

app.engine("pug", require("pug").__express);
app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));
app.use(require("./controllers"));

app.listen(port, function() {
  console.log(`Listening on port ${port}...`);
});
