const { Router } = require('express');
const { check }  = require('express-validator');

const { cargarArchivo, actualizarImagen, mostrarImg } = require('../controllers/uploads');
const { validarJWT, validarCampos, validarArchivo } = require('../middlewares');

const router = Router();

router.post('/',[
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