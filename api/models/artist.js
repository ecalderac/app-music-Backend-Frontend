'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;//permite definir el esquema de la base de datos

var ArtistSchema = Schema({
        name: String,
        description: String,
        image: String
}); //creando el esquema

module.exports = mongoose.model('Artist', ArtistSchema); 