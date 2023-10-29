
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
        required: [ true, 'El nombre es requerido' ]
    },


    contraseña: {
        type: String,
        required: [ true, 'La contraseña es requerida' ],
    },


    rol: {
        type: String,
        required: [ true, 'El rol es requerido' ],
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


// methods
schemaUsuario.methods.toJSON = function() {

    const { _id, __v, contraseña, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario

}


// exports
module.exports = model( 'usuario', schemaUsuario );