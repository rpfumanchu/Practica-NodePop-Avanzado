var express = require("express");
var router = express.Router();
const Ad = require("../models/Ad");
const { validationResult } = require("express-validator");
const findOut = require("./api/validations");
const getCatalogue = require("../lib/filter");
const sessionAuth = require("../lib/sessionAuthMiddleware");
const upload = require("../lib/uploadConfigure");

/* GET home page. */
// http://127.0.0.1:3001
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET create page. */
// http://127.0.0.1:3001/create
router.get("/create", sessionAuth, function (req, res, next) {
  res.locals.saveAd = null;
  res.render("create");
});

//DONE Filtra anuncios por todos sus campos e implemto limit, skip, fields
//NOTE get /filter
// http://127.0.0.1:3001/filter
router.get("/filter", sessionAuth, findOut(), async (req, res, next) => {
  try {
    const ad = await getCatalogue(req);

    res.locals.filterAds = ad;
    //res.locals.filteredByField = req.query.fields;
    res.render("filter-ad");
  } catch (error) {
    next(error);
  }
});

//DONE Buscar anuncios filtrando por precio
//NOTE GET /range/
// http://127.0.0.1:3001/range/559-800
router.get("/range/:price", sessionAuth, findOut(), async (req, res, next) => {
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

//DONE distintos tags que hay en mi bd
//NOTE GET /tags
// http://127.0.0.1:3001/tags?tag=tags
router.get("/tags", sessionAuth, async (req, res, next) => {
  try {
    const tags = req.query.tags;

    const ad = await Ad.distinctTag(tags);

    res.locals.tags = ad;
    res.render("tags");
  } catch (error) {
    next(error);
  }
});

//DONE Crea un anuncio
//NOTE POST /create (body)
//http:127.0.0.1/:3001/create
router.post(
  "/create",
  sessionAuth,
  findOut(),
  upload.single("img"),
  async (req, res, next) => {
    try {
      const adData = req.body;
      adData.img = req.file ? req.file.filename : "";
      console.log(adData.img);
      console.log(adData);
      const thumbnail = await Ad.imageMicroService(adData.img);

      //NOTE Creo una instancia de ad en memoria
      const ad = new Ad(adData);

      //NOTE La persistimos en la base de datos
      const saveAd = await ad.save();

      res.locals.saveAd = saveAd;
      res.render("create");
      console.log(
        `creado con exito anuncio con id ${saveAd.id} y nombre ${saveAd.name} `,
      );
    } catch (error) {
      next(error);
    }
  },
);

//DONE modifica un anuncio
//NOTE PUT /api/catalogue/modify
//localhost:3001/modify/"_id del anuncio"
router.put("/modify/:id", findOut(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedAd = await Ad.findByIdAndUpdate(id, data, {
      new: true, // "nota para mi" esto hace que nos devuelva el documento actualizado
    });

    res.locals.updatedAd = updatedAd;
    res.render("create");
    console.log(
      `actualizado anuncio con id ${updatedAd.id} y nombre ${updatedAd.name} `,
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
