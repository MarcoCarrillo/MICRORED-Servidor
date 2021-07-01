const mongoose = require('mongoose');

const UsuariosEmpresaSchema = mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    registro:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('UsuarioEmpresa', UsuariosEmpresaSchema);