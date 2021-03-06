const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crear proyectos
//Endpoint: /api/proyectos
router.post('/', //verifica todo lo del middleware de auth primero y una vez que pasa se va al siguiente middleware que es el proyectoController
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ], 
    proyectoController.crearProyecto
);

//Obtener los proyectos del usuario que está autenticado
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

//Eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
)

module.exports = router;