const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

//Crear una nueva tarea
exports.crearTarea = async (req, res) =>{
    
    //Revisar si hay errores
    const errores = validationResult(req); //req retorna un array
    if( !errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    
    try {

        //Extraer el proyecto y comprobar si existe
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}