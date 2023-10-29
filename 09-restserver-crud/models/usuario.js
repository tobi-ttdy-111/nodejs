
// imports
const { Schema, model } = require( 'mongoose' );


// schemaUsuario
const schemaUsuario = new Schema({


    correo: {
        type: String,
        required: [ true, 'El correo es requerido' ],
        unique: true
    },


    nombre: {
        type: String,
        required: [ true, 'El nombre es requerido' ],
    },


    contraseña: {
        type: String,
        required: [ true, 'La contraseña es requerido' ],
    },


    rol: {
        type: String,
        required: [ true, 'El rol es requerido' ]
    },


    estado: {
        type: Boolean,
        default: true
    },


    google: {
        type: Boolean,
        default: false
    },


    img: {
        type: String
    }


});


schemaUsuario.methods.toJSON = function() {

    const { __v, _id, contraseña, ...usuario } = this.toObject();
    return usuario;

};


// exports
module.exports = model( 'usuario', schemaUsuario );