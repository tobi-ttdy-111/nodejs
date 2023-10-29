
// imports
const { isValidObjectId } = require( 'mongoose' );
const Usuario = require( '../models/usuario' );
const Categoria = require( '../models/categoria' );
const Producto = require( '../models/producto' );
const { response } = require( 'express' );


// buscarUsuario
const buscarUsuario = async( termino = '', res = response ) => {

    const buscarId = isValidObjectId( termino )
    if ( buscarId ) {
        const usuario = await Usuario.findById( termino );
        return res.json({ results: ( usuario ) ? [ usuario ] : [] });
    };
    const regex = new RegExp( termino, 'i' );
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    res.json({ results: usuarios });

};


// buscarCategoria
const buscarCategoria = async( termino = '', res = response ) => {

    const buscarId = isValidObjectId( termino )
    if ( buscarId ) {
        const categoria = await Categoria.findById( termino );
        return res.json({ results: ( categoria ) ? [ categoria ] : [] });
    };
    const regex = new RegExp( termino, 'i' );
    const categorias = await Categoria.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    });
    res.json({ results: categorias });

};


// buscarProducto
const buscarProducto = async( termino = '', res = response ) => {

    const buscarId = isValidObjectId( termino )
    if ( buscarId ) {
        const producto = await Producto.findById( termino ).populate( 'categoria', 'nombre' );
        return res.json({ results: ( producto ) ? [ producto ] : [] });
    };
    const regex = new RegExp( termino, 'i' );
    const productos = await Producto.find({
        $or: [{ nombre: regex }, { descripcion: regex }],
        $and: [{ estado: true }]
    }).populate( 'categoria', 'nombre' );
    res.json({ results: productos });

};


// exports
module.exports = {
    buscarUsuario,
    buscarCategoria,
    buscarProducto
};
