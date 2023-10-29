
// imports
const { Router } = require( 'express' );
const { getUsuario,
        postUsuario,
        putUsuario,
        deleteUsuario } = require( '../controllers/usuario' );


// router
const router = Router();


// get /usuario
router.get( '/usuario', getUsuario );


// post /usuario
router.post( '/usuario', postUsuario );


// put /usuario
router.put( '/usuario', putUsuario );


// delete /usuario
router.delete( '/usuario', deleteUsuario );


// exports
module.exports = router;