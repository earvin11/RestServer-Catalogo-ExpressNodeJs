const { Router } = require('express');
const { check }  = require('express-validator');

const { cargarArchivo, actualizarImagen, mostrarImg } = require('../controllers/uploads');
const { validarJWT, validarCampos, validarArchivo } = require('../middlewares');


// const { validarArchivo } = require('../middlewares/validar-archivo');
// const { validarCampos } = require('../middlewares/validar-campos');
// const validarJWT = require('../middlewares/validar-jwt');



const router = Router();

router.post('/',[
    validarJWT,
    validarArchivo,
    validarCampos
],cargarArchivo );

router.put('/articulos/:id',[
    validarJWT,
    validarArchivo,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
],actualizarImagen );

router.get('/articulos/:id', [
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
], mostrarImg );





module.exports = router;