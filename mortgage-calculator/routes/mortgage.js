var express = require("express");
const calculateMonthlyFee = require("../lib/calculateMonthlyFee");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.locals.result = null;
  res.render("calculator");
});

router.post("/", (req, res, next) => {
  //NOTE Recuperar los parámetros necesarios para el cálculo
  const { capital, rate, term, useEuribor, euriborValue } = req.body;

  //NOTE Realizar el cálculo de la cuota mensual
  const result = calculateMonthlyFee(
    capital,
    rate,
    term,
    useEuribor,
    euriborValue,
  );

  // Enviar el resultado como respuesta
  res.locals.result = result;
  res.render("calculator");
});

module.exports = router;
