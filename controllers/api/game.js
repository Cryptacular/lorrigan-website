var express = require("express"),
  router = express.Router();

router.get("/:id", function(req, res) {
  res.sendFile(`${global.appRoot}/assets/games/${req.params.id}.json`);
});

module.exports = router;
