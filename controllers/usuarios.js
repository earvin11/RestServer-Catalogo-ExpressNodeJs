const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const getUsuarios = async( req, res ) => {

    try {
        const usuarios = await Usuario.find({ estado: true });
    
        res.json({
            ok: true,
            usuarios
        });
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }


}


const crearUsuario = async( req, res ) => {

    const { nombre, apellido, nick, password, rol } = req.body;

    const usuario = new Usuario({
        nombre,
        apellido,
        nick,
        password,
        rol
    });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(); 

    usuario.password = bcryptjs.hashSync( password, salt );

    try {
        await usuario.save();
        
        res.status(201).json({
            ok: true,
            msg: 'Usuario Creado',
            usuario
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}


module.exports = {
    crearUsuario,
    getUsuarios
}