

// imports
const { Schema, model } = require( 'mongoose' );


// schemaProducto
const schemaProducto = new Schema({


    nombre: {
        type: String,
        required: [ true, 'La categoria es requerida' ],
        unique: true
    },


    estado: {
        type: Boolean,
        default: true
    },


    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: [ true, 'El usuario es requerido' ]
    },


    precio: {
        type: Number,
        default: 0
    },


    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categoria',
        required: [ true, 'La categoría es requerida' ]
    },


    descripcion: {
        type: String
    },


    disponible: {
        type: Boolean,
        default: true
    }


});


// methods
schemaProducto.methods.toJSON = function() {
    const { __v, estado, ...producto } = this.toObject();
    return producto
};


// exports
module.exports = model( 'producto', schemaProducto );