var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const LoginControllerApi = require("./controllers/loginControllerApi");
const jwtAuthApiMiddlewar = require("./lib/jwtAuthApiMiddleware");
const i18n = require("./lib/i18nConfigure");
const LoginControllerweb = require("./controllers/loginControllerWeb");

const session = require("express-session");
const MongoStore = require("connect-mongo");

require("./lib/connectMongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// para que no se vea que uso express
app.set("x-powered-by", false);

app.locals.title = "NodePop";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

const loginControllerApi = new LoginControllerApi();

/**
 * Rutas del API
 */
app.use(
  "/api/catalogue",
  jwtAuthApiMiddlewar,
  require("./routes/api/catalogue"),
);
app.post("/api/login", loginControllerApi.authApi);
app.use("/api/users", require("./routes/api/users"));

/**
 * Rutas del Website
 */
app.use(i18n.init);
app.use(
  session({
    name: "nodeapp-session",
    secret: "as78dbas8d7bva6sd6vas",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, // expira a los 2 días de inactividad
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STR,
    }),
  }),
);

const loginControllerWeb = new LoginControllerweb();

// // hacemos que el objeto de sesión esté disponible al renderizar vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/change-locale", require("./routes/change-locale"));
app.get("/login", loginControllerWeb.index);
app.post("/login", loginControllerWeb.post);
app.get("/logout", loginControllerWeb.logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // comprobar si es un error de validación
  if (err.array) {
    // const errorInfo = err.array({ onlyFirstError: true })[0];
    const errorInfo = err.errors[0];
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);

  // si lo que ha fallado es una petición al API
  // devuelvo el error en formato JSON
  if (req.originalUrl.startsWith("/api/")) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.render("error");
});

module.exports = app;
