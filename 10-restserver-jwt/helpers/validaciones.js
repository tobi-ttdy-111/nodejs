
// imports
const Usuaio = require( '../models/usuario' );
const Rol = require( '../models/rol' );


// existeCorreo
const existeCorreo = async( correo ) => {

    const existe = await Usuaio.findOne({ correo });
    if ( existe ) throw new Error( `${ correo }, ya pertenece a una cuenta` );

};


// existeRol
const existeRol = async( rol ) => {

    const existe = await Rol.findOne({ rol });
    if ( !existe ) throw new Error( `${ rol }, no es un rol vñalido` );

};



// existeId
const existeId = async( id ) => {

    const existe = await Usuaio.findById( id );
    if ( !existe ) throw new Error( `${ id }, no pertenece a ningún usuario` );

};


// exports
module.exports = {
    existeCorreo,
    existeRol,
    existeId
};



