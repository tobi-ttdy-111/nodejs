
// imports
const { request, response } = require( 'express' );
const Usuario = require( '../models/usuario' );
const bcryptjs = require( 'bcryptjs' );
const generarJWT = require( '../helpers/generarJWT' );
const googleVerify = require('../helpers/googleVerify');


// postAuth
const postAuth = async( req = request, res = response ) => {

    const { correo, contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) return res.status( 400 ).json({ msg: 'usuario / contraseña no válidos - correo' });
        if ( !usuario.estado ) return res.status( 400 ).json({ msg: 'usuario / contraseña no válidos - estado' });
        const match = bcryptjs.compareSync( contraseña, usuario.contraseña );
        if ( !match ) return res.status( 400 ).json({ msg: 'usuario / contraseña no válidos - contraseña' });
        const token = await generarJWT( usuario.id );
        res.json({ usuario, token })
    } catch ( err ) {
        console.log( err );
        res.status( 500 ).json({ msg: 'Hable con el administrador' });
    };

};


// postGoogle
const postGoogle = async( req = request, res = response ) => {

    const { google_token } = req.body;
    try {
        const { correo, nombre, img } = await googleVerify( google_token );
        let usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            const data = {
                nombre,
                correo,
                contraseña: 'google',
                img,
                google: true,
                rol: 'USER'
            };
            usuario = new Usuario( data );
            await usuario.save();
        } else return res.status( 401 ).json({ msg: 'Correo ya registrado' });
        if ( !usuario.estado ) return res.status( 401 ).json({ msg: 'Hable con el administrador - estado' });
        const token = await generarJWT( usuario.id );
        res.json({ usuario, token });
    } catch ( err ) {
        console.log( err );
        res.status( 400 ).json({ msg: 'Hable con el administrador' });
    };

};


// exports
module.exports = {
    postAuth,
    postGoogle
};