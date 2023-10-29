
// imports
const express = require( 'express' );
const cors = require( 'cors' );
const fileUpload = require( 'express-fileupload' );
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
        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    };


    // routes
    routes() {

        this.app.use( require( '../routes/usuario' ) );
        this.app.use( require( '../routes/auth' ) );
        this.app.use( require( '../routes/categoria' ) );
        this.app.use( require( '../routes/producto' ) );
        this.app.use( require( '../routes/buscar' ) );
        this.app.use( require( '../routes/upload' ) );

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