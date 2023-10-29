
// impotrs
const { Router } = require( 'express' );
const { getBuscar } = require( '../controllers/buscar' );


// router
const router = Router();


// get /buscar
router.get( '/buscar/:categoria/:termino', getBuscar );


// exports
module.exports = router;