'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;//permite definir el esquema de la base de datos

var UserSchema = Schema({
        name: String,
        surname: String,
        email: String,
        password: String,
        role: String,
        image: String
}); //creando el esquema

module.exports = mongoose.model('User', UserSchema); //se tiene de referencia user y todo lo q contiene es lo q se va agregando ahi cuando se llama a user