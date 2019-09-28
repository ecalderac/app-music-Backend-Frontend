'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;//permite definir el esquema de la base de datos

var AlbumSchema = Schema({
        title: String,
        description: String,
        year: Number,
        image: String,
        artist: {type: Schema.ObjectId, ref: 'Artist'}//referencia a Artist ver esquema BD
}); //creando el esquema

module.exports = mongoose.model('Album', AlbumSchema); 