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

//Obtener las tareas por proyecto
exports.obtenerTareas = async (req, res) => {

    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;


        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
        res.json({ tareas });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualizar una tarea
exports.actualizarTarea = async (req, res)=>{
    try {

         //Extraer el proyecto, nombre y estado de la tarea y comprobar si existe
        const {proyecto, nombre, fecha, estado} = req.body; 

        //Si la tarea existe
        // console.log(req.params.id);
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        //Revisar si el proyecto existe
        const existeProyecto = await Proyecto.findById(proyecto);
    
        //Revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if(existeProyecto.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Crear objeto con la nueva info
        const nuevaTarea={};
        //Si quiere cambiar el nombre de la tarea
        nuevaTarea.nombre = nombre;
        
        //Si quiere cambiar la fecha de la tarea
        nuevaTarea.fecha = fecha;
        
        //Si quiere cambiar el estado
        nuevaTarea.estado = estado;

        //Guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea, {new: true});
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

//Elimina una tarea
exports.eliminarTarea = async (req, res) =>{
    try {

        //Extraer el proyecto y comprobar si existe
       const {proyecto} = req.query; 

       //Si la tarea existe
       // console.log(req.params.id);
       let tarea = await Tarea.findById(req.params.id);
       if(!tarea){
           return res.status(404).json({msg: 'No existe esa tarea'});
       }

       //Revisar si el proyecto existe
       const existeProyecto = await Proyecto.findById(proyecto);
   
       //Revisar si el proyecto actual pertenece al usuario autenticado
       //verificar el creador del proyecto
       if(existeProyecto.creador.toString() !== req.usuario.id ){
           return res.status(401).json({msg: 'No autorizado'});
       }

       //Eliminar
       await Tarea.findOneAndRemove({_id: req.params.id });
       res.json({msg: 'Tarea eliminada'})

   } catch (error) {
       console.log(error);
       res.status(500).send('Hubo un error')
   }
}