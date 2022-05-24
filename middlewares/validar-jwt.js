const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');



const validarJWT = async( req, res, next ) => {

    // Extrae de los headers de la request el valor que tenga 'x-token'
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        // Con el metodo verify de jsonwebtoken envia el token y la firma personal de los jwt para comparar
        // El resultado en caso de que haga match traera entre otras cosas el id del usuario que envia el token
        // Extrae el id
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )

        //Agrega una nueva propiedad en la request la cual tendra ese id de usuario
        req.uid = uid;


        // Para saber que usuario envia la peticion
        const userAuth = await Usuario.findById(uid);

        if( !userAuth ) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido - Usuario no existe'
            })
        }

        // Verificar si el usuario no esta marcado como eliminado
        if( !userAuth.estado ) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido - Usuario borrado de la BBDD'
            })
        }
        
        // Establecer el usuario a la req
        req.usuario = userAuth;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

}


module.exports = {
    validarJWT
};