var express = require("express");
var router = express.Router();
const Ad = require("../models/Ad");

//DONE distintos tags que hay en mi bd
//NOTE GET /tags
// http://127.0.0.1:3001/tags?tag=tags
router.get("/tags", async (req, res, next) => {
  try {
    const tags = req.query.tags;

    const ad = await Ad.distinctTag(tags);

    res.locals.tags = ad;
    res.render("tags");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
