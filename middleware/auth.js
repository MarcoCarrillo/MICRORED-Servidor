//Middleware personalizados

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //Leer el token del header}
    const token = req.header('x-auth-token');
    // console.log(token);

    //Revisar si no hay token
    if(!token){
        res.status(401).json({ msg: 'No hay token, permiso no valido'});
    }

    //Validar token

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA); //Este metodo verifica el token cifrado
        req.usuario = cifrado.usuario; //creamos un nuevo objeto en el req llamado usuario y como cuando creamos un usuario le pasamos el id del mismo ahora podemos acceder al id desde el nuevo objeto del req
        next(); //Para que se vaya al siguiente middleware
    } catch (error) {
        res.status(401).json({ msg: 'Token no valido'});
    }
}