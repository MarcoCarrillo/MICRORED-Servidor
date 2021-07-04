//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

//autentica un usuario
//Endpoint: /api/auth
router.post('/', 
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 })
    ],
    authController.autenticarUsuario
);
module.exports = router;
