const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

//Crear proyectos
//Endpoint: /api/proyectos
router.post('/',
proyectoController.crearProyecto
)

module.exports = router;