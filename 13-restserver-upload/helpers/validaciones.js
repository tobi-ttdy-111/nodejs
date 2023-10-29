
// imports
const Usuario = require( '../models/usuario' );
const Rol = require( '../models/rol' );
const Categoria = require( '../models/categoria' );
const Producto = require( '../models/producto' );


// existeCorreo
const existeCorreo = async( correo ) => {

    const existe = await Usuario.findOne({ correo });
    if ( existe ) throw new Error( `${ correo }, ya es un correo registrado` );

};


// existeRol
const existeRol = async( rol ) => {

    const existe = await Rol.findOne({ rol });
    if ( !existe ) throw new Error( `${ rol }, no es un rol válido` );

};


// existeId
const existeId = async( id ) => {

    const existe = await Usuario.findById( id );
    if ( !existe ) throw new Error( `${ id }, no pertenece a ningun usuario` );

};


// existeCategoria
const existeCategoria = async( categoria ) => {

    const existe = await Categoria.findById( categoria );
    if ( !existe ) throw new Error( `Id: ${ categoria }, no pertenece a ninguna categoria` );
    if ( !existe.estado ) throw new Error( `Categoria: ${ existe.nombre }, ya a sido marcada como borrada` );

};


// existeNombre
const existeNombre = async( nombre ) => {

    const existe = await Producto.findOne({ nombre: nombre.toUpperCase() });
    if ( existe ) throw new Error( `Producto: ${ nombre } ya está registrado` );

};


// existeProducto
const existeProducto = async( producto ) => {

    const existe = await Producto.findById( producto );
    if ( !existe ) throw new Error( `Id: ${ producto }, no pertenece a ninguna producto` );
    if ( !existe.estado ) throw new Error( `Producto: ${ existe.nombre }, ya a sido marcado como borrada` );

};


// incluyeColeccion
const incluyeColeccion = async( coleccion = '', colecciones = [] ) => {

    const incluye = colecciones.includes( coleccion );
    if ( !incluye ) throw new Error( `La colección ${ coleccion } no es válida` );
    return true

};


// exports
module.exports = {
    existeCorreo,
    existeRol,
    existeId,
    existeCategoria,
    existeNombre,
    existeProducto,
    incluyeColeccion
};