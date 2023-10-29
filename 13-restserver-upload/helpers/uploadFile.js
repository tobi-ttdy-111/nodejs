
// imports
const { v4:uuidv4 } = require( 'uuid' );
const path = require( 'path' );


// uploadFile
const uploadFile = async( files, extenciones = [ 'png', 'jpg', 'jpeg', 'gif' ], carpeta ) => {
    return new Promise( ( resolve, reject ) => {

        const { archivo } = files;
        const archivoSplit = archivo.name.split( '.' );
        const extension = archivoSplit[ archivoSplit.length - 1 ];
        if ( !extenciones.includes( extension ) ) return reject( `La extensión ${ extension } no es permitida` );

        const nombre = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombre );
        archivo.mv( uploadPath, ( err ) => {
            if ( err ) return reject( err );
            resolve( nombre );
        });

    });
};


// exports
module.exports = uploadFile;