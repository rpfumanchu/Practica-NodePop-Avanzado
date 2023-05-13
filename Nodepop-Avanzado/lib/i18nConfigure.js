const i18n = require("i18n");
const path = require("path");

i18n.configure({
  locales: ["es", "en"],
  directory: path.join(__dirname, "..", "locales"),
  defaultLocale: "en",
  //NOTE Watch for changes in json files to reload locale on updates
  autoReload: true,
  //NOTE Sync locale information across all files
  syncFiles: true,
});

//NOTE Para utilizar en scripts
i18n.setLocale("en");

module.exports = i18n;
