var express = require("express");
var router = express.Router();
const findOut = require("./api/validations");
const getCatalogue = require("../lib/filter");

//DONE Filtra anuncios por todos sus campos e implemto limit, skip, fields
//NOTE get /filter
// http://127.0.0.1:3001/filter
router.get("/filter", findOut(), async (req, res, next) => {
  try {
    const ad = await getCatalogue(req);

    res.locals.filterAds = ad;
    //res.locals.filteredByField = req.query.fields;
    res.render("filter-ad");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
