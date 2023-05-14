const express = require("express");
const router = express.Router();

//NOTE GET /change-locale

router.get("/:locale", (req, res, next) => {
  const locale = req.params.locale;

  //NOTE pongo una cookie en la respuesta que indique el nuevo locale al browser
  res.cookie("nodepop-locale", locale, {
    maxAge: 1000 * 60 * 30 * 24 * 30,
  });

  //NOTE Respondo con una redirección a la página de donde venga la petición
  res.redirect(req.get("referer"));
});

module.exports = router;
