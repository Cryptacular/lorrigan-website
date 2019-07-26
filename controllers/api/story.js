var express = require("express"),
  router = express.Router();

router.get("/:id", function(req, res) {
  res.sendFile(`${global.appRoot}/assets/stories/${req.params.id}.md`);
});

module.exports = router;
