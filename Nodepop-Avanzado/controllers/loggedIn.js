const { User } = require("../models");

class LoggedIn {
  async index(req, res, next) {
    try {
      const userId = req.session.loggedUser;

      const user = await User.findById(userId);

      if (!user) {
        next(new Error("user not found"));
        return;
      }
      // //NOTE Si el usuario existe y la contraseña coincide apuntar en la sesión del usuario que está logueado
      // req.session.loggedUser = user;

      console.log("estoy logueado en otra pagina", req.session.loggedUser);
      //res.locals.user = { email: user.email };
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoggedIn;
