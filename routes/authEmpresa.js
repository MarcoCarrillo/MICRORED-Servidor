//Rutas para autenticar usuarios de empresa
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authEmpresaController = require('../controllers/authEmpresaController');

//autentica un usuario empresa
//Endpoint: /api/authEmpresa
router.post('/', 
    [
        check('usuario', 'Usuario invalido').not().isEmpty(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 })
    ],
    authEmpresaController.autenticarUsuarioEmpresa

);
module.exports = router;
