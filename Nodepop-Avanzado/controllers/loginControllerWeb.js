const { User } = require("../models");

class LoginControllerWeb {
  index(req, res, next) {
    res.locals.error = "";
    res.locals.email = "";
    res.render("login");
  }

  //NOTE login post desde el website
  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      //DONE Buscar el usuario en la BD
      const user = await User.findOne({ email: email });

      //NOTE si no lo encuentro o no coincide la contraseña --> error
      if (!user || !(await user.comparePassword(password))) {
        res.locals.error = req.__("Invalid credentials");
        res.locals.email = email;
        res.render("login");
        return;
      }

      //NOTE Si el usuario existe y la contraseña coincide apuntar en la sesión del usuario que está logueado
      req.session.loggedUser = user._id;

      console.log("estoy logueado", req.session.loggedUser);

      // const redirectTo = req.headers.origin; // Ruta predeterminada si no hay una página almacenada
      // console.log("a donde voy", redirectTo);

      res.redirect("/filter");
    } catch (error) {
      next(error);
    }
  }

  logout(req, res, next) {
    req.session.regenerate(err => {
      if (err) {
        next(err);
        return;
      }
      res.redirect("/");
    });
  }
}

module.exports = LoginControllerWeb;
