const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) =>{
    //Revisar si hay errores
    const errores = validationResult(req); //req retorna un array
    if( !errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer el email y pass del req.body
    const {email, password}= req.body;

    try {
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        //Revisar el pass de la bd con el que ingresen
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'La contraseña es incorrecta'});
        }

        //Si todo es correcto Crear y firmar el jwt
        const payload = { 
            usuario:{
                id: usuario.id
            }
        };
        //Firma
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 18000 //5 horas
        },(error, token) =>{
            if(error) throw error;
            res.json({ token }); 
        })


    } catch (error) {
        console.log(error)
    }
}

//Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id); //Trae el usuario de la db
        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}