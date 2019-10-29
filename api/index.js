'use strict'

var mongoose = require('mongoose');   //cargando modulo de MONGODB
var app = require('./app');
var port = process.env.PORT || 3977; //puerto del servidor web

mongoose.connect('mongodb://localhost:27017/curso_mean2', { useNewUrlParser: true}, (err, res) => {
    if(err)
    {
        throw err;
    }
    else
    {
        console.log("Base de Datos corriendo correctamente");
        app.listen(port, function(){
            console.log("Servidor del API REST de musica escuchando en hhtp://localhost:"+port);
        });
    }
}); //conectando a la base de datos de mongodb