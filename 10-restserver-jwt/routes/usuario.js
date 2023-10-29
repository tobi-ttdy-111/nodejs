
// imports
const { Router } = require( 'express' );
const { getUsuario,
        postUsuario,
        putUsuario,
        deleteUsuario } = require( '../controllers/usuario' );
const { check } = require( 'express-validator' );
const { validarReq } = require('../middlewares/validarReq');
const { existeCorreo,
        existeRol,
        existeId } = require( '../helpers/validaciones' );
const { validarJWT } = require('../middlewares/validarJWT');
const { tieneRol } = require( '../middlewares/tieneRol' );


// router
const router = Router();


// get /usuario
router.get( '/usuario', getUsuario );


// post /usuario
router.post( '/usuario', [
    check( 'correo', 'No es un correo válido' ).isEmail(),
    check( 'correo' ).custom( existeCorreo ),
    check( 'nombre', 'No es un nombre válido' ).not().isEmpty(),
    check( 'contraseña', 'Contraseña debe ser de 6 o más carácteres' ).isLength({ min: 6 }),
    check( 'rol' ).custom( existeRol ),
    validarReq
], postUsuario );


// put /usuario
router.put( '/usuario/:id', [
    check( 'id', 'No es un Id válido' ).isMongoId(),
    check( 'id' ).custom( existeId ),
    check( 'rol' ).custom( existeRol ),
    validarReq
], putUsuario );


// delete /usuario
router.delete( '/usuario/:id', [
    validarJWT,
    tieneRol( 'ADMIN' ),
    check( 'id', 'No es un Id válido' ).isMongoId(),
    check( 'id' ).custom( existeId ),
    validarReq
], deleteUsuario );


// exports
module.exports = router;