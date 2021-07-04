const UsuarioEmpresa = require('../models/UsuarioEmpresa');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuarioEmpresa = async (req, res) =>{
    //Revisar si hay errores
    const errores = validationResult(req); //req retorna un array
    if( !errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //Extraer el email y pass del req.body
    const {usuario, password}= req.body;
    try {
        //Revisar que sea un usuario registrado
        // console.log(req.body);
        let usuarioEmpresa = await UsuarioEmpresa.findOne({ usuario });
        if(!usuarioEmpresa){
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        //Revisar el pass de la bd con el que ingresen
        const passCorrecto = await bcryptjs.compare(password, usuarioEmpresa.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'La contraseña es incorrecta'});
        }

        //Si todo es correcto Crear y firmar el jwt
        const payload = { 
            usuarioEmpresa:{
                id: usuarioEmpresa.id
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
        console.log(error);
    }
}