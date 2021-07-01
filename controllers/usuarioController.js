//Funciones llamadas entre el proceso de la peticion y el envio de la respuesta (Middleware)
//Exports para poder usarla en otros archivos y como parametro se le pasa el request y la response (peticion y respuesta)
const Usuario = require('../models/Usuario')

exports.crearUsuario = async (req, res) =>{
    try {
        let usuario;

        //crea el nuevo usuario que va tener los campos del modelo
        usuario = new Usuario(req.body);

        //guardar el usuario
        await usuario.save();

        //Mensaje de confirmacion
        res.send('Usuario creado correctamente');
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error'); //Status 400 es una bad request o una peticion mal
    }
}