

const form = document.getElementById( 'cookieForm' );

form.addEventListener( 'submit', ( e ) => {
    e.preventDefault();

    const data = new FormData( form );
    const obj = {};

    data.forEach( ( value, key ) => obj[ key ] = value );

    fetch( '/cookie', {
        method: 'POST',
        body: JSON.stringify( obj ),
        headers: {
            'Content-Type': 'application/json'
        }
    } ).then( result => result.json() ).then( json => console.log( json ) );

} );

const getCookie = () => {
    console.log( document.cookie );
};

