const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerArticulos, 
        obtenerArticulo, 
        guardarArticulo, 
        actualizarArticulo, 
        borrarArticulo } = require('../controllers/articulos');

const { validarCampos,
        validarJWT, 
        esAdminRole} = require('../middlewares');
        


const router = Router();


router.get('/', obtenerArticulos );

router.get('/:id', [
        check('id', 'No es un id valido').isMongoId(),
        validarCampos
], obtenerArticulo );

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
], guardarArticulo );

router.put('/:id', [
        validarJWT,
        check('id', 'No es un id valido').isMongoId(),
        validarCampos
],actualizarArticulo );

router.delete('/:id', [
        validarJWT,
        esAdminRole,
        check('id', 'No es un id valido').isMongoId(),
        validarCampos
], borrarArticulo );


module.exports = router;