
// imports
const { request, response } = require( 'express' );
const Usuario = require( '../models/usuario' );
const bcryptjs = require( 'bcryptjs' );
const generarJWT = require('../helpers/generarToken');


// postAuth
const postAuth = async( req = request, res = response ) => {

    const { correo, contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) return res.status( 400 ).json({ msg: 'usuario / contraseña incorrectos - correo' });
        if ( !usuario.estado ) return res.status( 400 ).json({ msg: 'usuario / contraseña incorrectos - estado' });
        const match = bcryptjs.compareSync( contraseña, usuario.contraseña );
        if ( !match ) return res.status( 400 ).json({ msg: 'usuario / contraseña incorrectos - contraseña' });
        const token = await generarJWT( usuario.id );
        res.json({ usuario, token });
    } catch ( err ) {
        res.status( 500 ).json({ msg: 'Hable con el administrador' });
    };

};


// exports
module.exports = { postAuth };