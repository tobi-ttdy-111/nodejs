
// imports
const express = require( 'express' );
const cors = require( 'cors' );


// Server
class Server {


    // constructor
    constructor() {

        this.app = express();
        this.puerto = process.env.PORT;
        this.middlewares();
        this.routes();

    };


    // middlewares
    middlewares() {

        this.app.use( express.static( 'public' ) );
        this.app.use( cors() );
        this.app.use( express.json() );

    };


    // routes
    routes() {

        this.app.use( require( '../routes/usuario' ) );

    };


    // listen
    listen() {

        this.app.listen( this.puerto, () =>{
            console.log( `Escuchando en el puerto ${ this.puerto }` );
        });

    };


};


// exports
module.exports = Server;