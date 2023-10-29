
// imports
const { Schema, model } = require( 'mongoose' );


// schemaCategoria
const schemaCategoria = new Schema({


    nombre: {
        type: String,
        required: [ true, 'La categoria es requerida' ]
    },


    estado: {
        type: Boolean,
        default: true
    },


    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required: [ true, 'El usuario es requerido' ]
    }


});


// methods
schemaCategoria.methods.toJSON = function() {
    const { __v, estado, ...categoria } = this.toObject();
    return categoria
};


// exports
module.exports = model( 'categoria', schemaCategoria );