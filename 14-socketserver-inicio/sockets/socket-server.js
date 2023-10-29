
// imports


// socketController
const socketController = ( socket ) => {


    // on mensaje
    socket.on( 'mensaje', ( payload, callback ) => {

        const id = socket.id;
        callback( id );
        socket.broadcast.emit( 'mensaje', { msg: payload } );

    });


};


// exports
module.exports = {
    socketController
};