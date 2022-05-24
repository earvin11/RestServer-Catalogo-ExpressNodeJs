const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerCategorias,
        obtenerCategoria, 
        actualizarCategoria,
        crearCategoria,
        borrarCategoria} = require('../controllers/categorias');
        
const existeCategoriaPorId = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');



const router = Router();


router.get('/', obtenerCategorias );

router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
],obtenerCategoria );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,crearCategoria );

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria );

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria );



module.exports = router;