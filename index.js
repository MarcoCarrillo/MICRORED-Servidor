//importar express
const express = require('express');
//Importar conectarDB
const conectarDB = require('./config/db');

//CORS
const cors = require('cors');

//Crear el servidor
const app = express();

//Conectar a la db
conectarDB();

//Habilitar CORS
app.use(cors({ credentials: true, origin: true }));

//Habilitar express.json para las solicitudes de POST y reconoce que es .json el objeto del request, se pueden hacer los requests con content-type: application.json desde headers en postman
app.use(express.json({extends: true}));

//Si hay puerto en variable de entorno tomar ese si no el puerto 4000
const port = process.env.port || 4000;

//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


//Arrancar el servidor
app.listen(port, '0.0.0.0', () =>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})