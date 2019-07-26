var express = require("express"),
  router = express.Router();

router.get("/", function(req, res) {
  res.sendFile(`${global.appRoot}/assets/games.json`);
});

module.exports = router;
