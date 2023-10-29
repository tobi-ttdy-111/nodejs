
// imports
const { Router } = require( 'express' );
const { postAuth } = require( '../controllers/auth' );
const { check } = require( 'express-validator' );
const { validarReq } = require( '../middlewares/validarReq' );


// router
const router = Router();


// post /auth
router.post( '/auth', [
    check( 'correo', 'El correo es obligatorio' ).isEmail(),
    check( 'contraseña', 'La contraseña es obligatoria' ).not().isEmpty(),
    validarReq
], postAuth );


// exports
module.exports = router;