
// imports
const { request, response } = require( 'express' );
const Categoria = require( '../models/categoria' );


// getCategorias
const getCategorias = async( req = request, res = response ) => {

    const { desde, limite } = req.query;

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true }).populate( 'usuario', 'nombre' )
            .skip( desde )
            .limit( limite )
    ]);

    res.json({ total, categorias, usuario: req.usuarioAuth });

};


// getCategoria
const getCategoria = async( req = request, res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id ).populate( 'usuario', 'nombre' );
    res.json({ categoria, usuario: req.usuarioAuth });

};


// postCategoria
const postCategoria = async( req = request, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    let categoria = await Categoria.findOne({ nombre });
    if ( categoria ) return res.status( 400 ).json({ msg: `La categoría ${ nombre } ya existe` });
    categoria = new Categoria({ nombre, usuario: req.usuarioAuth._id });

    await categoria.save();
    res.json({ categoria, usuario: req.usuarioAuth });

};


// putCategoria
const putCategoria = async( req = request, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, { nombre } );
    res.json({ categoria, usuario: req.usuarioAuth });

};


// deleteCategoria
const deleteCategoria = async( req = request, res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false } );
    res.json({ categoria, usuario: req.usuarioAuth });

};


// exports
module.exports = {
    getCategorias,
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
};