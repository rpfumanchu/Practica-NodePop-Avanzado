var express = require("express");
var router = express.Router();
const Ad = require("../models/Ad");
const { validationResult } = require("express-validator");
const findOut = require("./api/validations");

//DONE Buscar anuncios filtrando por precio
//NOTE GET /range/
// http://127.0.0.1:3001/range/559-800
router.get("/range/:price", findOut(), async (req, res, next) => {
  try {
    validationResult(req).throw();

    let price = req.params.price;

    const pricer = await Ad.priceRange(price);

    res.locals.priceRange = pricer;
    res.render("price-range");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
