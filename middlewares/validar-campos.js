const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next ) => {

    // Valida los errores que vengan en la req
    const errors = validationResult(req);
    
    //Si errors no esta vacia (!isEmpty) retorna estatus 400 mostrando lo que este dentro de errors
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();

}


module.exports = { 
    validarCampos
};
