//Rutas para el usuario empresarial
const express = require('express');
const router = express.Router();
const usuarioEmpresaController = require('../controllers/usuarioEmpresaController');
const { check } = require('express-validator');

//Crear un usuario
//Endpoint: /api/usuariosMicrored
router.post('/', 
    [
        check('usuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 })
    ],
    usuarioEmpresaController.crearUsuarioEmpresa
);
module.exports = router;
