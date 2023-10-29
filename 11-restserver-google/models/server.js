
// imports
const express = require( 'express' );
const cors = require( 'cors' );
const connection = require( '../database/config' );


// Server
class Server {


    // constructor
    constructor() {

        this.app = express();
        this.puerto = process.env.PORT;
        this.dbConnection();
        this.middlewares();
        this.routes();

    };


    // dbConnection
    async dbConnection() {

        await connection();

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
        this.app.use( require( '../routes/auth' ) );

    };


    // listen
    listen() {

        this.app.listen( this.puerto, () => {
            console.log( `Escuchando en el puerto ${ this.puerto }` );
        });

    };


};


// exports
module.exports = Server;