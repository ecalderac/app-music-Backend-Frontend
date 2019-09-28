'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;//permite definir el esquema de la base de datos

var SongSchema = Schema({
        number: String,
        name: String,
        duration: String,
        file: String,
        album: {type: Schema.ObjectId, ref: 'Album'}//referencia al album ver esquema BD
}); //creando el esquema

module.exports = mongoose.model('Song', SongSchema);