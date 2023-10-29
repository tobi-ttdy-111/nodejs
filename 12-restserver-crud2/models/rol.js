
// imports
const { Schema, model } = require( 'mongoose' );


// schemaRol
const schemaRol = new Schema({


    rol: {
        type: String,
        required: [ true, 'El rol es requerido' ],
        unique: true
    }


});


// exports
module.exports = model( 'rol', schemaRol );