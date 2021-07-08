const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearProyecto = async (req, res) => {

    //Resultado de la validacion del check de ruta
    //Revisar si hay errores
    const errores = validationResult(req); //req retorna un array con los errores
    if( !errores.isEmpty()){ //revisa que el arreglo no este vacio, porque si esta vacio significa que no hay errores
        return res.status(400).json({errores: errores.array()}) //Si hay un error va mostrar un array con el mensaje de error que puse en la ruta correspondiente
    }

    try {
        //Crear un proyecto
        const proyecto = new Proyecto(req.body); //como solo es el nombre el que enviaremos solo le pasamos lo que se envie

        //guardar el creador del proyecto via JWT
        proyecto.creador = req.usuario.id; //Le pasamos id el creador que venga del req.usuario

        //Guardamos el proyecto
        proyecto.save();
        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error'); //500=error en el server
    }

}


//Obtiene todos los proyectos del usuario actual

exports.obtenerProyectos = async(req, res) =>{
    try {
        // console.log(req.usuario);//El objeto con el id del usuario autenticado
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1}); //Filtra los proyectos de la BDD segun el id del creador y los ordena en el orden que fueron creados del mas reciente al mas antiguo
        res.json(proyectos); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}