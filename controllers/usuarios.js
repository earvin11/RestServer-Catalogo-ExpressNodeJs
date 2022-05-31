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

const putPasswordUser = async( req, res ) => {

    const idUser = req.usuario._id;

    let { password } = req.body;

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(); 

    password = bcryptjs.hashSync( password, salt );

    try {

        const usuario = await Usuario.findByIdAndUpdate( idUser, { password }, { new: true });

        res.status(200).json({
            ok: true,
            msg: 'La contraseña ha sido actualizada',
            usuario
        });
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const updatePasswordOlvidada = async( req, res ) => {

    const { id } = req.body;

    let { password } = req.body;

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(); 

    password = bcryptjs.hashSync( password, salt );

    try {

        const usuario = await Usuario.findByIdAndUpdate(id, { password }, {new: true});
        
        res.status(200).json({
            ok: true,
            usuario
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
        });
    }


}


module.exports = {
    crearUsuario,
    getUsuarios,
    putPasswordUser,
    updatePasswordOlvidada
}