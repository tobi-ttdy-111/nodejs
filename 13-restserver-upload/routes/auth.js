
// imports
const { Router } = require( 'express' );
const { postAuth,
        postGoogle } = require( '../controllers/auth' );
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


// post /google
router.post( '/google', [
    check( 'google_token', 'El google_token es obligatorio' ).not().isEmpty(),
    validarReq
], postGoogle )


// exports
module.exports = router;