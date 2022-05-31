


const esAdminRole = ( req, res, next ) => {

    if( !req.usuario ) {
        return res.status(500).json({
            ok: false,
            msg: 'Se quiere verificar el rol sin validar antes el token'
        });
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            ok: false,
            msg: `Lo siento ${ nombre }, no tienes permiso para ejecutar esta acción`
        });
    }


    next();

}


module.exports = {
    esAdminRole
}