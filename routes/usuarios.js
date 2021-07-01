//Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

//Crear un usuario
//Endpoint: /api/usuarios
router.post('/', 
    [
        //check es una funcion para validar con express validator y tiene como parametros  Campo a validar, mensaje y reglas
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 })
    ],
    usuarioController.crearUsuario
);
module.exports = router;
