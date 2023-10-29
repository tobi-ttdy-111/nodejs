
// imports
const Usuario = require( '../models/usuario' );
const Rol = require( '../models/rol' );


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


// exports
module.exports = {
    existeCorreo,
    existeRol,
    existeId
};