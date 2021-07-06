const Proyecto = require('../models/Proyecto');

exports.crearProyecto = async (req, res) => {

    try {
        //Crear un proyecto
        const proyecto = new Proyecto(req.body); //como solo es el nombre el que enviaremos solo le pasamos lo que se envie
        proyecto.save();
        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error'); //500=error en el server
    }

}