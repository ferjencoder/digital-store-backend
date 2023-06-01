const socket = io();

const form = document.querySelector( '.products-section' );
form.addEventListener( 'submit', async ( e ) => {
    e.preventDefault();

    const product = {
        title: form.title.value,
        category: form.category.value,
        code: form.code.value,
        shortDescription: form.shortDescription.value,
        description: form.description.value,
        thumbnails: form.thumbnails.value,
        demoUrl: form.demoUrl.value,
        techStack: form.techStack.value,
        stock: form.stock.value,
        pric: form.pric.value,
    };

    // Emit a 'new-product'
    socket.emit( 'new-product', product );

    // Reset your form here
    form.reset();
} );

