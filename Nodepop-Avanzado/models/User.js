const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//DONE Crear Schema Users

const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

//NOTE Método estático

userSchema.statics.usersAll = function () {
  const query = User.find();
  console.log(query);
  return query;
};

userSchema.statics.hashPassword = function (rawPassword) {
  return bcrypt.hash(rawPassword, 7);
};

//NOTE Método de instancia

userSchema.methods.comparePassword = function (rawPassword) {
  return bcrypt.compare(rawPassword, this.password);
};

//NOTE Crear modelo

const User = mongoose.model("User", userSchema);

//NOTE Exporto el modelo
module.exports = User;
