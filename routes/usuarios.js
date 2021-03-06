const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, 
        getUsuarios, 
        putPasswordUser, 
        updatePasswordOlvidada } = require('../controllers/usuarios');

const { validarJWT,
        validarCampos, 
        esAdminRole } = require('../middlewares');
        


const router = Router();


router.get('/', getUsuarios );

router.get('/:id', );

router.post('/',[
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('nick', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
],crearUsuario );

router.put('/',[
    validarJWT,
    validarCampos
],putPasswordUser );

router.put('/password', updatePasswordOlvidada );

router.delete('/:id', );


module.exports = router;