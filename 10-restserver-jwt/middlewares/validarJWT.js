
// imports
const { request, response } = require( 'express' );
const jwt = require( 'jsonwebtoken' );
const Usuario = require( '../models/usuario' );


// validarJWT
const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header( 'tokensito' );
    if ( !token ) return res.status( 401 ).json({ msg: 'Token no válido - no token' });

    try {
        const { uid } = jwt.verify( token, process.env.SECRETKEY );
        const usuario = await Usuario.findById( uid );
        if ( !usuario ) return res.status( 401 ).json({ msg: 'Token no válido - usuario' });
        if ( !usuario.estado ) return res.status( 401 ).json({ msg: 'Token no válido - estado' });
        req.usuarioAuth = usuario;
        next();
    } catch ( err ) {
        console.log( err );
        res.status( 401 ).json({ msg: 'Token no válido - err' });
    };

};


// exports
module.exports = { validarJWT };