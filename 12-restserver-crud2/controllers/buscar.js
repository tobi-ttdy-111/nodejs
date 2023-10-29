
// impotrs
const { request, response } = require( 'express' );
const { buscarUsuario, buscarCategoria, buscarProducto } = require('../helpers/buscar');


// categorias
const categorias = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];


// getBuscar
const getBuscar = ( req = request, res = response ) => {

    const { categoria, termino } = req.params;

    if ( !categorias.includes( categoria ) ) return res.status( 400 ).json({ msg: `Las categorias permitidas son: ${ categorias }` });
    switch ( categoria ) {
        case 'usuarios':
            buscarUsuario( termino, res );
        break;
        case 'categorias':
            buscarCategoria( termino, res );
        break;
        case 'productos':
            buscarProducto( termino, res );
        break;
        default: res.status( 500 ).json({ msg: 'Hable con el administrador' });
    };

};


// exports
module.exports = {
    getBuscar
};