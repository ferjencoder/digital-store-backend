

const socket = io();


const input = document.getElementById( 'textbox' );
const texto = document.getElementById( 'texto' );

input.addEventListener( 'keyup', evt => {

    if ( evt.key === 'Enter' ) {
        socket.emit( 'message', input.value )
        input.value == '';
    };

} );

socket.on( 'imprimir', ( data ) => {
    let mensajes = '';

    data.forEach( msj => {
        mensajes += `${msj.socketId} rescribió: ${msj.message} <br/>`
    } );

    texto.innerHTML = mensajes;
} )


