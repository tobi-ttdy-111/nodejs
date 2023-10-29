
// imports
const { Router } = require( 'express' );
const { getProductos,
    getProducto,
    postProducto,
    putProducto,
    deleteProducto } = require( '../controllers/producto' );
const { check } = require('express-validator');
const { validarJWT } = require( '../middlewares/validarJWT' );
const { validarReq } = require( '../middlewares/validarReq' );
const { existeNombre,
        existeCategoria,
        existeProducto } = require( '../helpers/validaciones' );


// router
const router = Router();


// get /productos
router.get( '/productos', getProductos );


// get /producto
router.get( '/producto/:id', getProducto );


// post /producto
router.post( '/producto', [
    validarJWT,
    check( 'nombre' ).notEmpty(),
    check( 'nombre' ).custom( existeNombre ),
    check( 'categoria' ).custom( existeCategoria ),
    validarReq
], postProducto );


// put /producto
router.put( '/producto/:id', [
    validarJWT,
    check( 'categoria' ).custom( existeCategoria ),
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeProducto ),
    validarReq
], putProducto );


// delete /producto
router.delete( '/producto/:id', [
    validarJWT,
    check( 'id', 'No es un id válido' ).isMongoId(),
    check( 'id' ).custom( existeProducto ),
    validarReq
], deleteProducto );


// exports
module.exports = router;