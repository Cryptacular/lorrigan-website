var express = require("express"),
  router = express.Router();

router.get("/", function(req, res) {
  res.sendStatus(200);
});

module.exports = router;
