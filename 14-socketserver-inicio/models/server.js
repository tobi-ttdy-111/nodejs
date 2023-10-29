
// imports
const express = require( 'express' );
const cors = require( 'cors' );
const { socketController } = require( '../sockets/socket-server' );


// Server
class Server {


    // constructor
    constructor() {

        this.app = express();
        this.puerto = process.env.PORT;
        this.server = require( 'http' ).createServer( this.app );
        this.io = require( 'socket.io' )( this.server );
        this.middlewares();
        this.sockets();

    };


    // middlewares
    middlewares() {

        this.app.use( express.static( 'public' ) );
        this.app.use( express.json() );
        this.app.use( cors() );

    };


    // sockets
    sockets() {

        this.io.on( 'connection', ( socket ) => {
            socketController( socket );
        });

    };


    // listen
    listen() {

        this.server.listen( this.puerto, () => {
            console.log( `Escuchando en el puerto ${ this.puerto }` );
        });

    };


};


// exports
module.exports = Server;