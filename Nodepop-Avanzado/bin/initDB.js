"use strict";

require("dotenv").config();

const { Ad, User } = require("../models");
const connection = require("../lib/connectMongoose");
const ad = require("./ad");
const users = require("./users");

main().catch(err => console.log("Hubo un error", err));

async function main() {
  // inicializo colección Ad
  await initAd();

  // inicializamos colección de usuarios
  await initUsers();

  // cierro conexión
  connection.close();
}

async function initAd() {
  // borro todos los documentos de la colección Ad
  const deleted = await Ad.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crea los anuncios iniciales
  const inserted = await Ad.insertMany(ad);
  console.log(`Creados ${inserted.length} anuncios`);
}

async function initUsers() {
  const deleted = await User.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  // obtener los usuarios iniciales
  const emailAndPasswords = await getEmailAndPasswords(users);

  const inserted = await User.insertMany(emailAndPasswords);
  //console.log(users);
  console.log(`Creados ${inserted.length} usuarios.`);
}

//   users.forEach(even => { {

//     email: even.email, password: await users.hasPassword(even.password)
//   }
//     console.log(`Email: ${even.email}, Password: ${even.password}`);
//   });

//   console.log(`Creados ${inserted.length} usuarios.`);
// }

// users.forEach(({ email, password }) => {
//   console.log(`Email: ${email}, Password: ${password}`);
// });

const getEmailAndPasswords = async usuarios => {
  const emailAndPasswords = [];
  for (const usuario of usuarios) {
    const { email, password } = usuario;
    const hashedPassword = await User.hashPassword(password);
    emailAndPasswords.push({ email: email, password: hashedPassword });
    console.log(emailAndPasswords);
  }
  return emailAndPasswords;
};
