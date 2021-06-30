//importar express
const express = require('express');
//Importar conectarDB
const conectarDB = require('./config/db');

//Crear el servidor
const app = express();

//Conectar a la db
conectarDB();

//Si hay puerto en variable de entorno tomar ese si no el puerto 4000
const PORT = process.env.PORT || 4000;

//Arrancar el servidor
app.listen(PORT, () =>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})