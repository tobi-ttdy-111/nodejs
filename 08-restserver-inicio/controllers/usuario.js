
// imports
const { request, response } = require( 'express' );


// getUsuario
const getUsuario = async( req = request, res = response ) => {

    res.json({ msg: 'Mostrando lista de usuarios' });

};


// postUsuario
const postUsuario = async( req = request, res = response ) => {

    res.json({ msg: 'post /usuario' });

};


// putUsuario
const putUsuario = async( req = request, res = response ) => {

    res.json({ msg: 'put /usuario' });

};


// deleteUsuario
const deleteUsuario = async( req = request, res = response ) => {

    res.json({ msg: 'delete /usuario' });

};


// exports
module.exports = {
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
};