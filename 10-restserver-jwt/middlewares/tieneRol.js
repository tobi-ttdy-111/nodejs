
// imports
const { request, response } = require( 'express' );;


// tieneRol
const tieneRol = ( ...roles ) => {
    return ( req = request, res = response, next ) => {

        if ( !req.usuarioAuth ) return res.status( 500 ).json({ msg: 'Usuario no autorizado - no autenticado' });
        if ( !roles.includes( req.usuarioAuth.rol ) ) return res.status( 401 ).json({ msg: 'Usuario no autorizado - rol no válido' });
        next();

    };
};


// exports
module.exports = {
    tieneRol
};