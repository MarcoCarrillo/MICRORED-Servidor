//Rutas para el usuario empresarial
const express = require('express');
const router = express.Router();
const usuarioEmpresaController = require('../controllers/usuarioEmpresaController');

//Crear un usuario
//Endpoint: /api/usuariosMicrored
router.post('/', 
    usuarioEmpresaController.crearUsuarioEmpresa
);
module.exports = router;
