

const socket = io();

// Add to Cart button
const addToCartButton = document.querySelector( '.add-to-cart' );

addToCartButton.addEventListener( 'click', async ( e ) => {
    const productId = this.dataset.productId;
    const cartId = 'your_cart_id_here'; // Retrieve the cart ID, possibly from the user session maybe?

    try {
        const response = await fetch( `/api/carts/${cartId}/product/${productId}`, {
            method: 'POST',
        } );

        if ( response.ok ) {
            alert( 'Product added to cart successfully' );

        } else {
            alert( 'Failed to add product to cart' );
        }
    } catch ( error ) {
        console.error( 'Error:', error );
        alert( 'An error occurred while adding product to cart' );
    }

} );
