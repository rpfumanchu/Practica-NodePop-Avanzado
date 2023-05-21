//DONE Al acceder a una página protegida me devuelva a login si no estoy logueado

module.exports = (req, res, next) => {
  if (req.session.loggedUser) {
    req.session.loggedUser;
    console.log("estoy logueado otra pagina", req.session.loggedUser);
  } else {
    res.redirect("/login");
    return;
  }

  next();
};
