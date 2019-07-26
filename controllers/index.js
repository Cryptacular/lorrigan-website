var express = require("express"),
  router = express.Router();

router.use("/api/games", require("./api/games"));
router.use("/api/game", require("./api/game"));
router.use("/api/stories", require("./api/stories"));
router.use("/api/story", require("./api/story"));

router.get("/", function(req, res) {
  res.render("index");
});

module.exports = router;
