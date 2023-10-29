
// socket
const socket = io();


// referencias
const online = document.querySelector( '#online' );
const offline = document.querySelector( '#offline' );
const mensaje = document.querySelector( '#mensaje' );
const enviar = document.querySelector( '#enviar' );


// server status
socket.on( 'connect', () => {

    online.style.display = '';
    offline.style.display = 'none';

});
socket.on( 'disconnect', () => {

    online.style.display = 'none';
    offline.style.display = '';

});


// mensaje
enviar.addEventListener( 'click', () => {

    const msg = mensaje.value;
    socket.emit( 'mensaje', msg, ( id ) => {
        console.log( id )
    });

});
socket.on( 'mensaje', ( payload ) => console.log( payload ));