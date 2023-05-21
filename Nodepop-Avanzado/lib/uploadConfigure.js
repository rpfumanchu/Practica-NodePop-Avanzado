const multer = require("multer");
const path = require("node:path");

//DONE Configuración de upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const route = path.join(__dirname, "..", "public", "images");
    cb(null, route);
  },
  filename: function (req, file, cb) {
    const filename =
      file.fieldname + "-" + Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
