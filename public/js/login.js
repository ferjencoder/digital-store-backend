

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


// // Connect to the socket server
// const socket = io();

// // Listen for the form submission event
// const loginForm = document.getElementById( 'login-form' );
// loginForm.addEventListener( 'submit', async ( event ) => {
//     event.preventDefault();

//     // Get the form data
//     const formData = new FormData( loginForm );
//     const email = formData.get( 'email' );
//     const password = formData.get( 'password' );

//     try {
//         // Make a request to the login API endpoint
//         const response = await fetch( '/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify( { email, password } ),
//         } );

//         if ( response.ok ) {
//             // Authentication successful
//             const { token } = await response.json();

//             // Store the token in local storage or session storage
//             localStorage.setItem( 'token', token );

//             // Redirect the user to the protected route
//             window.location.href = '/protected';
//         } else {
//             // Authentication failed
//             const error = await response.text();
//             showError( error );
//         }
//     } catch ( error ) {
//         console.error( error );
//         showError( 'Internal server error' );
//     }
// } );

// function showError ( message ) {
//     const errorContainer = document.getElementById( 'error-container' );
//     errorContainer.textContent = message;
//     errorContainer.style.display = 'block';
// }
