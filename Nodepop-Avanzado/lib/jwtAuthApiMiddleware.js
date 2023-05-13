const jwt = require("jsonwebtoken");
const createError = require("http-errors");

//NOTE Modulo que me exporta un middleware
module.exports = async (req, res, next) => {
  try {
    //DONE Recoger el jwtToken de la cabecera, o el body o la query-string
    let jwtToken = req.get("Authorization") || req.body.jwt || req.query.jwt;

    jwtToken = jwtToken.replace("Bearer ", "");

    console.log("hay token");

    //DONE Compruebo que me lo han mandado
    if (!jwtToken) {
      const error = createError(401, "no token provided");
      next(error);
      return;
    }

    console.log("existe token");
    //DONE Comprobar que el token es válido
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log("token verificado");
    req.apiLoggedUser = payload._id;

    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      next(createError(401, "invalid token"));
      return;
    }
    next(error);
  }
};
