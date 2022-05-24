const validarArchivo = ( req, res, next ) => {

     // Si no viene nada en los files res.400
     if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos que subir - validarArchivo' });
        return;
    }

    next();
}

module.exports = {
    validarArchivo
}