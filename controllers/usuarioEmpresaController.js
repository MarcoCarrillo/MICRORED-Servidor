const UsuarioEmpresa = require('../models/UsuarioEmpresa');
const bcryptjs = require('bcryptjs');

exports.crearUsuarioEmpresa = async (req, res) =>{

    //Extraer usuario y password del req.body
    const {usuario, password} = req.body;


    try {
        //Revisar que el usuario registrado sea el unico con ese usuario
        let usuarioEmpresa = await UsuarioEmpresa.findOne({usuario});

        if(usuarioEmpresa){
            return res.status(400).json({ msg: 'Este usuario empresarial ya existe' });
        }

        usuarioEmpresa = new UsuarioEmpresa(req.body);

        //Hasheo
        const salt = await bcryptjs.genSalt(10);
        usuarioEmpresa.password = await bcryptjs.hash(password, salt);

        await usuarioEmpresa.save();
        res.json({ msg: 'Usuario empresarial creado correctamente' });
        console.log(req.body); 
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en el registro');
    }
}