
// imports
const { Router } = require( 'express' );
const { getCategorias,
        getCategoria,
        postCategoria,
        putCategoria,
        deleteCategoria } = require( '../controllers/categoria' );
const { check } = require( 'express-validator' );
const { validarReq } = require( '../middlewares/validarReq' );
const { validarJWT } = require( '../middlewares/validarJWT' );
const { existeCategoria } = require( '../helpers/validaciones' );


// router
const router = Router();


// get /categorias
router.get( '/categorias', getCategorias );


// get /categoria
router.get( '/categoria/:id', [
    validarJWT,
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeCategoria ),
    validarReq
], getCategoria );


// post /categoria
router.post( '/categoria', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    validarReq
], postCategoria );


// put /categoria
router.put( '/categoria/:id', [
    validarJWT,
    check( 'nombre', 'El nuevo nombre es obligatorio' ).notEmpty(),
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeCategoria ),
    validarReq
], putCategoria );


// delete /categoria
router.delete( '/categoria/:id', [
    validarJWT,
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeCategoria ),
    validarReq
], deleteCategoria );


// exports
module.exports = router;