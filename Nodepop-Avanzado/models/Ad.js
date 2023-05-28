const mongoose = require("mongoose");
const path = require("node:path");
const { Requester } = require("cote");

const requester = new Requester({ name: "thumbnailService" });

// definir el esquema de los anuncios
const AdSchema = mongoose.Schema({
  name: String,
  state: Boolean,
  price: Number,
  tags: Array,
  img: String,
});

AdSchema.index({ name: 1 });
AdSchema.index({ img: 1 });
//AdSchema.index({ price: 1 });

//DONE método estático para las query

AdSchema.statics.catalogue = function (filter, skip, limit, sort, fields) {
  const query = Ad.find(filter); //(filter:{"name":/play5/i}));
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
};

//DONE método estático para sacar los distintos tags
AdSchema.statics.distinctTag = function () {
  const query = Ad.distinct("tags");
  return query.exec();
};

//DONE Método estático para aplicar un rango de precio al anuncio
AdSchema.statics.priceRange = function (price) {
  //NOTE Precio exacto 50
  if (!price.includes("-")) {
    const query = Ad.find({ price: price });
    console.log(price);
    return query.exec();
  } else {
    const newPrice = price.split("-");
    const price1 = newPrice[0];
    const price2 = newPrice[1];

    if (price1 && price2) {
      //NOTE Rango de precio 50-200
      const query = Ad.find({ price: { $gte: price1, $lte: price2 } });
      console.log(price1, price2);
      return query.exec();
    } else if (price1) {
      //NOTE Precio mayor igual 50-
      const query = Ad.find({ price: { $gte: price1 } });
      return query.exec();
    } else if (price2) {
      //NOTE Precio menor igual -50
      const query = Ad.find({ price: { $lte: price2 } });
      return query.exec();
    }
  }
};

//DONE Método para cambiar true o false del state de anuncio por venta o compra
AdSchema.virtual("adStatus").get(function () {
  return this.state ? "on sale" : "buy";
});

//DONE Método microservice
AdSchema.statics.imageMicroService = async function (img) {
  const image = {
    type: "generateThumbnail",
    imagePath: path.join(__dirname, "..", "public", "images", img),
    thumbnailPath: path.join(
      __dirname,
      "..",
      "public",
      "images",
      "thumbnail",
      `thumbn-${img}`,
    ),
    width: 200,
    height: 200,
  };
  return new Promise(resolve => requester.send(image, resolve));
};

// crear el modelo de Ad
const Ad = mongoose.model("Ad", AdSchema);

// exportar el modelo
module.exports = Ad;
