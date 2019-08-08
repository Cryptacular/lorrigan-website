var fs = require("fs"),
  express = require("express"),
  router = express.Router();

router.get("/:id", function(req, res) {
  try {
    var content = fs.readFileSync(
      `${global.appRoot}/assets/stories/${req.params.id}.md`,
      "utf8"
    );
    res.json({
      content
    });
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
