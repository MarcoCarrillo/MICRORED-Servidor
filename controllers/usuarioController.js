//Funciones llamadas entre el proceso de la peticion y el envio de la respuesta (Middleware)
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator'); //Para saber el resultado de la validacion que esta en routes
const jwt = require('jsonwebtoken'); //En react no existen las sesiones y el fin de jwt es compartir info entre aplicaciones en un objeto json, verifica autenticidad cuando el user se loguea y se verifica para que pueda acceder a los demas recursos


//Exports para poder usarla en otros archivos y como parametro se le pasa el request y la response (peticion y respuesta)
exports.crearUsuario = async (req, res) =>{

    //Revisar si hay errores
    const errores = validationResult(req); //req retorna un array
    if( !errores.isEmpty()){ //revisa que el arreglo no este vacio, porque si esta vacio significa que no hay errores
        return res.status(400).json({errores: errores.array()}) //Si hay un error va mostrar un array con el mensaje de error que puse en la ruta correspondiente
    }

    //Extraemos el email y password
    const {email, password} = req.body;

    try {
        //Revisar que el usuario registrado sea el unico con ese email
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        //crea el nuevo usuario que va tener los campos del modelo
        usuario = new Usuario(req.body);

        //Despues de crear el usuario se hashea el password para mas seguridad
        const salt = await bcryptjs.genSalt(10); //numero de digitos aleatorios que se le agrega al password

        //Reescribir el password ya hasheado
        usuario.password = await bcryptjs.hash(password, salt); //.hash toma como primer parametro el string que va hashear y como segundo los salt

        //guardar el usuario
        await usuario.save();

        //Crear y firmar el jwt
        const payload = { //Como payload ira el id de usuario
            usuario:{
                id: usuario.id
            }
        };

        //Firmar el jwt
        jwt.sign(payload, process.env.SECRETA, { //Toma el id de usuario, la palabra secreta con la ue va firmar el token
            expiresIn: 7200 //2 horas
        }, (error, token) =>{ //callback para revisar si hay un error al crear el token
            if(error) throw error; //Marque el error y deje de ejecutar esa parte
            //Retornar el token 
            res.json({ token }); 
        })


        
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error'); //Status 400 es una bad request o una peticion mal
    }
}