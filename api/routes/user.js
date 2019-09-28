'user strict'

var express = require('express');//cargando module de express
var UserController = require('../controllers/user'); //cargando el fichero q esta en user controllers

var api = express.Router(); //cargando el routes de express
var md_auth = require('../middlewares/authenticated');//cargando middleware

var multipart = require('connect-multiparty'); //trabaja con la subida de ficheros
var md_upload = multipart({ uploadDir: './uploads/users' });

//Rutas que se utiliza para los usuarios
api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage); 
api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;