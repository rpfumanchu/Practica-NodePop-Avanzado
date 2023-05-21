const { User } = require("../models");
const jwt = require("jsonwebtoken");

//DONE login post desde el API
class LoginControllerApi {
  async authApi(req, res, next) {
    try {
      const { email, password } = req.body;

      //NOTE Buscar el usuario en la BD
      const user = await User.findOne({ email: email });

      //NOTE sSi no existe o la contraseña no coincide --> error
      if (!user || !(await user.comparePassword(password))) {
        res.json({ error: "invalid credentials" });
        return;
      }

      //NOTE Si existe y la contraseña coincide
      //NOTE Creo un JWT con el _id del usuario dentro
      const tokenApi = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });

      res.json({ jwt: tokenApi });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginControllerApi;
