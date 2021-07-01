const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'}); //Se requiere dotenv y le pasamos como configuracion que donde va encontrar esas variables va ser en el archivo variables.env

const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            //config para ara algunos errores
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB conectada')
    } catch (error) {
        console.log(error);
        process.exit(1); //Detener la app
    }
}

module.exports = conectarDB; //Para poder usar la funcion en mas componentes