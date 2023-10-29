
// imports
const { Router } = require( 'express' );
const { putColeccionId } = require( '../controllers/upload' );
const { check } = require( 'express-validator' );
const { incluyeColeccion } = require( '../helpers/validaciones' );
const { validarReq } = require( '../middlewares/validarReq' );


// router
const router = Router();


// put /:coleccion/:id
router.put( '/:coleccion/:id', [
    check( 'coleccion' ).custom( c => incluyeColeccion( c, [ 'usuarios', 'productos' ] )),
    check( 'id', 'No es un id válido' ).isMongoId(),
    validarReq
], putColeccionId );


// exports
module.exports = router;