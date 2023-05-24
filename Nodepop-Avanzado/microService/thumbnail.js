"use strict";

const path = require("path");
const { Responder } = require("cote");
const Jimp = require("jimp");

//DONEn Crea el microservicio usando Cote
const responder = new Responder({ name: "thumbnailService" });

//NOTE Manejador de la solicitud para generar la miniatura
responder.on("generateThumbnail", async (req, done) => {
  try {
    const { imagePath, thumbnailPath, width, height } = req;

    const resolvedImagePath = path.resolve(imagePath);
    const resolvedThumbnailPath = path.resolve(thumbnailPath);

    //NOTE Carga la imagen con Jimp
    const image = await Jimp.read(resolvedImagePath);

    //NOTE redimensiono la imagen

    image.resize(width, height);

    //NOTE guardo la miniatura en el directorio de salida
    await image.writeAsync(resolvedThumbnailPath);

    //TODO
    done(null, "Thumbnail generado correctamente");
  } catch (error) {
    done(error);
  }
});

console.log("Servicio de miniaturas en ejecución...");
