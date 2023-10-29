
// imports
const { request, response } = require( 'express' );
const Usuario = require( '../models/usuario' );
const Producto = require( '../models/producto' );
const cloudinary = require( 'cloudinary' ).v2;


// config
cloudinary.config( process.env.CLOUDINARY_URL );


// putColeccionId
const putColeccionId = async( req = request, res = response ) => {

    const { coleccion, id } = req.params;

    if ( !req.files || !req.files.archivo ) return res.status( 400 ).json({ msg: 'No hay archivos en la petición' });
    let modelo;
    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById( id );
            if ( !modelo ) return res.status( 400 ).json({ msg: 'No existe ningún usuario con el id porporcionado' });
        break;
        case 'productos':
            modelo = await Producto.findById( id );
            if ( !modelo ) return res.status( 400 ).json({ msg: 'No existe ningún producto con el id porporcionado' });
        break;
        default:
            return res.status( 500 ).json({ msg: 'Se me olvidó validar esto' });
    };
    if ( modelo.img ) {
        const nombreArr = modelo.img.split('/');
        const nombre    = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    modelo.img = secure_url;


    await modelo.save();
    res.json({ modelo });

};


// exports
module.exports = {
    putColeccionId
};