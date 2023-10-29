
// imports
const { request, response } = require( 'express' );
const { validationResult } = require( 'express-validator' );


// validarReq
const validarReq = ( req = request, res = response, next ) => {

    const errores = validationResult( req );
    if ( !errores.isEmpty() ) return res.status( 400 ).json( errores );
    next();

};


// exports
module.exports = { validarReq };