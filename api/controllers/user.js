'user strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');//modulo para encriptar contraseñas
var User = require('../models/user');//invocando al modelo de usuario en la variable User
var jwt = require('../services/jwt');//para los token


function pruebas (req, res){
    res.status(200).send({
        message: 'Probando un accion del controlador de usuarios del api rest con Node y MongoDB'
    });
}
//funcion para el registro de usuarios
function saveUser(req, res){
    var user = new User();

    var params = req.body;

    console.log(params);

    user.name = params.name; //variables que llegan por post
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN'; //COLOCAR 'ROLE_ADMIN' SI ES QUE SE QUIERE GUARDAR UN USARIO ADMINISTRADOR, CASO CONTRARIO COLOCAR 'ROLE_USER' SI ES QUE SE QUIERE GUARDAR UN USUARIO NORMAL Q NO ES ADMINISTRADOR 
    user.image = 'null';

    if(params.password){
        //Encriptar contraseña y guardar datos
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;

            if(user.name != null && user.surname != null && user.email != null){
                //guardar el usuario
                user.save((err,userStored)=> {
                    if(err){
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });

            }else{
                res.status(200).send({message: 'Rellena todos los campos'});
            }
        });   
    }
    else{
        res.status(200).send({message: 'Introduce la contraseña'});
    }

}

//funcion para el login
function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!user){
                res.status(404).send({message: 'El usuario no existe'});
            }else{
                //Comprobar la contraseña
                bcrypt.compare(password, user.password, function(err, check){
                    if(check){
                        //devolver los datos del usuario logueado
                        if(params.gethash){
                            //devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }
                        else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message: 'El usuario no ha podido loguearse'});
                    }
                    
                });
            }
        }
    });
}

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    //este if comprueba q el id del usuario sea el mismo pra poder actualizarlo solo el y nadie mas 
    if(userId != req.user.sub){
       return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
    }

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar al usuario'});
            }
            else{
                res.status(200).send({user: userUpdated});
            }
        }
    })
}

//funcion para subir imagenes , se podria ocupar para subir archivos de otro tipo tambn como .txt ejemplo
function uploadImage(req, res){
    var userId = req.params.id;
    var filename = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
                if(!userUpdated){
                    res.status(404).send({message: 'No se ha podido actualizar al usuario'});
                }
                else{
                    res.status(200).send({image: file_name, user: userUpdated});
                }
            });
        }else{
            res.status(200).send({message: 'Extension del archivo no valida'});
        }   
    }
    else{
        res.status(200).send({message: 'No ha subido ninguna imagen...'});
    }
}

//funcion que obtiene imagen del servidor
function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/'+imageFile;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen...'});
        }
    })
}

//funcion para obtener todos los usuarios
function getUsers(req, res){ //codigo para realizar paginacion

    if(req.params.page){
        var page = req.params.page; //realizando paginacion para decir cuantos artistas deben aparecer por pagina(en este caso 3)
    }else{
        var page = 1;
    }
    
    var itemsPerPage = 15;

    User.find().sort('name').paginate(page, itemsPerPage, function(err, users, total){
        if(err){
            res.status(500).send({message:'Error en la peticion.'});
        }else{
            if(!users){
                res.status(404).send({message:'No hay usuarios'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    users: users
                });
            }
        }
    });

}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile,
    getUsers
};