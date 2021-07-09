const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crea una tarea
//Endpoint: /api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha de finalizacion es obligatoria').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()

    ],
    tareaController.crearTarea
)

module.exports = router;