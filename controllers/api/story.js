var fs = require("fs"),
  express = require("express"),
  router = express.Router();

router.get("/:id", function(req, res) {
  var content = fs.readFileSync(
    `${global.appRoot}/assets/stories/${req.params.id}.md`,
    "utf8"
  );
  res.json({
    content
  });
});

module.exports = router;
