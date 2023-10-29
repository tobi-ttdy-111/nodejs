
// imports
const { request, response } = require( 'express' );
const Producto = require( '../models/producto' );


// getProductos
const getProductos = async( req = request, res = response ) => {

    const { desde, limite } = req.query;

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true }).populate( 'categoria', 'nombre' )
            .skip( desde )
            .limit( limite )
    ]);

    res.json({ total, productos, usuario: req.usuarioAuth });

};


// getProducto
const getProducto = async( req = request, res = response ) => {

    const { id } = req.params;

    const producto = await Producto.findById( id ).populate( 'categoria', 'nombre' );
    res.json({ producto, usuario: req.usuarioAuth });

};


// postProducto
const postProducto = async( req = request, res = response ) => {

    const { nombre, precio, categoria, descripcion } = req.body;

    if ( precio && !Number( precio ) ) return res.status( 400 ).json({ meg: 'El precio debe ser un numero' });
    const producto = new Producto({ nombre: nombre.toUpperCase(), precio, categoria, descripcion, usuario: req.usuarioAuth._id });

    await producto.save();
    res.json({ producto, usuario: req.usuarioAuth });

};


// putProducto
const putProducto = async( req = request, res = response ) => {

    const { nombre, precio, categoria, descripcion, disponible } = req.body;
    const { id } = req.params;

    let actualizacion = {};
    if ( nombre ) actualizacion.nombre = nombre;
    if ( precio ) {
        if ( precio && !Number( precio ) ) return res.status( 400 ).json({ meg: 'El precio debe ser un numero' });
        actualizacion.precio = Number( precio );
    };
    if ( descripcion ) actualizacion.descripcion = descripcion
    if ( Boolean( disponible ) ) actualizacion.disponible = disponible;

    const producto = await Producto.findByIdAndUpdate( id, actualizacion);
    res.json({ producto, usuario: req.usuarioAuth });

};


// deleteProducto
const deleteProducto = async( req = request, res = response ) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate( id, { estado: false } );
    res.json({ producto, usuario: req.usuarioAuth });

};


// exports
module.exports = {
    getProductos,
    getProducto,
    postProducto,
    putProducto,
    deleteProducto
};