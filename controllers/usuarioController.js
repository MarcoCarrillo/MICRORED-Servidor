//Funciones llamadas entre el proceso de la peticion y el envio de la respuesta (Middleware)
//Exports para poder usarla en otros archivos y como parametro se le pasa el request y la response (peticion y respuesta)
exports.crearUsuario = (req, res) =>{
    console.log(req.body)
}