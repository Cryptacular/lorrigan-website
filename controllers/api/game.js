var express = require("express"),
  router = express.Router();

router.get("/:id", function(req, res) {
  try {
    res.sendFile(`${global.appRoot}/assets/games/${req.params.id}.json`);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
