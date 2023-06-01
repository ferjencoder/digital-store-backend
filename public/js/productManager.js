




const deleteButton = document.querySelector( '.btn-delete' );
deleteButton.addEventListener( 'click', async () => {

    try {

        console.log( 'Delete' );

        await axios.delete( `/api/products/${product.id}` );

        // You may want to remove the product from the front-end list here or reload the products

    } catch ( error ) {
        console.error( error );

        // handle the error, maybe show an error message to the user

    }
} );

const editButton = document.querySelector( '.btn-edit' );
editButton.addEventListener( 'click', async () => {

    // gather the updated product data into a variable, let's say updatedProductData

    try {
        console.log( 'EDIT' );

        const response = await axios.put( `/api/products/${product.id}`, updatedProductData );
        const updatedProduct = response.data;
        // handle the updated product, maybe show a success message to the user and update the product in the front-end list
    } catch ( error ) {
        console.error( error );
        // handle the error, maybe show an error message to the user
    }
} );



// For each Delete button, add an event listener that calls handleDelete
// deleteButtons.forEach( button => {

//     button.addEventListener( "click", async function ( event ) {
//         console.log( 'DELETE' );
//         try {
//             await axios.delete( `/api/products/${event.target.dataset.id}` );
//             fetchProducts();
//         } catch ( error ) {
//             console.error( error );
//             setError( 'Error deleting product' );
//         }
//     } );
// } );

// // For each Edit button, add an event listener that calls handleEdit
// editButtons.forEach( button => {

//     button.addEventListener( "click", function ( event ) {
//         console.log( 'EDIT' );
//         setSelectedProduct( event.target.dataset.id );
//     } );
// } );
