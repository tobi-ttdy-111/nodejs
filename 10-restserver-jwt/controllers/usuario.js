
// imports
const { request, response } = require( 'express' );
const bcryptjs = require( 'bcryptjs' );
const Usuario = require( '../models/usuario' );


// getUsuario
const getUsuario = async( req = request, res = response ) => {

    const { desde, limite } = req.query;

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip( desde )
            .limit( limite )
    ]);

    res.json({ total, usuarios });

};


// postUsuario
const postUsuario = async( req = request, res = response ) => {

    const { correo, nombre, contraseña, rol } = req.body;

    const usuario = new Usuario({ correo, nombre, contraseña, rol });
    const salt = bcryptjs.genSaltSync( 10 );
    usuario.contraseña = bcryptjs.hashSync( contraseña, salt );

    await usuario.save();
    res.json( usuario );

};


// putUsuario
const putUsuario = async( req = request, res = response ) => {

    const { id } = req.params;
    const { contraseña, google, _id, __v, ...actualizacion } = req.body;

    if ( contraseña ) {
        const salt = bcryptjs.genSaltSync( 10 );
        actualizacion.contraseña = bcryptjs.hashSync( contraseña, salt );
    };

    const usuario = await Usuario.findByIdAndUpdate( id, actualizacion )
    res.json( usuario );

};


// deleteUsuario
const deleteUsuario = async( req = request, res = response ) => {

    const { id } = req.params;
    const { usuarioAuth } = req.usuarioAuth;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
    res.json({ usuario, usuarioAuth });

};


// exports
module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
};