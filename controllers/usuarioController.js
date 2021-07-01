//Funciones llamadas entre el proceso de la peticion y el envio de la respuesta (Middleware)
//Exports para poder usarla en otros archivos y como parametro se le pasa el request y la response (peticion y respuesta)
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');

exports.crearUsuario = async (req, res) =>{

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

        //Mensaje de confirmacion
        res.json({ msg: 'Usuario creado correctamente' });
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error'); //Status 400 es una bad request o una peticion mal
    }
}