const UsuarioEmpresa = require('../models/UsuarioEmpresa');

exports.crearUsuarioEmpresa = async (req, res) =>{
    try {
        let usuarioEmpresa;
        usuarioEmpresa = new UsuarioEmpresa(req.body);
        await usuarioEmpresa.save();
        res.send('Usuario privado creado correctamente');
        console.log(req.body);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error en el registro');
    }
}