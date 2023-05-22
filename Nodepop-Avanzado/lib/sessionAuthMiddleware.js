//DONE Al acceder a una página protegida me devuelva a login si no estoy logueado

module.exports = (req, res, next) => {
  if (!req.session.loggedUser) {
    res.redirect("/login");
    return;
  }
  next();
};
