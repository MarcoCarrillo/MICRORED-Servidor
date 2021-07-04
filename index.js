//importar express
const express = require('express');
//Importar conectarDB
const conectarDB = require('./config/db');

//Crear el servidor
const app = express();

//Conectar a la db
conectarDB();

//Habilitar express.json para las solicitudes de POST y reconoce que es .json el objeto del request, se pueden hacer los requests con content-type: application.json desde headers en postman
app.use(express.json({extends: true}));

//Si hay puerto en variable de entorno tomar ese si no el puerto 4000
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use('/api/usuariosMicrored', require('./routes/usuariosEmpresa'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/authEmpresa', require('./routes/authEmpresa'));

//Arrancar el servidor
app.listen(PORT, () =>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})