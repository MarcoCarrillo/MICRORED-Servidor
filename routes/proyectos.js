const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');

//Crear proyectos
//Endpoint: /api/proyectos
router.post('/', //verifica todo lo del middleware de auth primero y una vez que pasa se va al siguiente middleware que es el proyectoController
    auth, 
    proyectoController.crearProyecto
);

router.get('/',
    auth,
    proyectoController.crearProyecto
)

module.exports = router;