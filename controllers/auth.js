const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');


const login = async( req, res ) => {

    const { nick, password } = req.body;
    
    try {

        //Verificar si el usuario existe y si esta activo
        const usuario = await Usuario.findOne({ nick });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password no son correctos - Usuario'
            });
        }

        if ( !usuario.estado ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario borrado de la base de datos'
            });
        }


        //Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario / Password no son correctos - Password'
            });
        }


        //Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    login
}