var express = require("express"),
  router = express.Router();

router.get("/", function(req, res) {
  res.sendFile(`${global.appRoot}/assets/stories.json`);
});

module.exports = router;
