const Proyecto = require('../models/Proyecto');

exports.crearProyecto = async (req, res) => {

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