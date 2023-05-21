var express = require("express");
var router = express.Router();
const Ad = require("../models/Ad");
const findOut = require("./api/validations");

/* GET create page. */
// http://127.0.0.1:3001/create
router.get("/create", function (req, res, next) {
  res.locals.saveAd = null;
  res.render("create");
});

//DONE Crea un anuncio
//NOTE POST /create (body)
//http:127.0.0.1/:3001/create
router.post("/create", findOut(), async (req, res, next) => {
  try {
    const adData = req.body;

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
});

module.exports = router;
