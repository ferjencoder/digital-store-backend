

const socket = io();

const form = document.querySelector( '.products-section' );

form.addEventListener( 'submit', async ( e ) => {
  e.preventDefault();

  try {
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
      price: form.price.value, // Updated field name from 'pric' to 'price'
    };

    // Emit a 'new-product'
    socket.emit( 'new-product', product );

  } catch ( error ) {
    console.error( error );

  } finally {
    // Reset your form here
    form.reset();
  }
} );

socket.on( 'update-products', ( products ) => {
  const productList = document.querySelector( '.products-list' );
  productList.innerHTML = '';

  products.forEach( ( product ) => {
    productList.innerHTML += `
      <li class='product-item' data-id='${product._id}'> <!-- Updated field name from 'id' to '_id' -->
        <img src='${product.thumbnails[ 0 ]}' alt='Image of ${product.title}' class='product-item__image' />
        <div class='product-item__body'>
          <p class='ff-secondary fs-2 ls-1'>${product.title}</p>
          <p>${product.category}</p>
          <p>${product.shortDescription}</p>
          <p>Price: ${product.price}</p>
        </div>
        <div class='product-item__buttons'>
          <button class='btn-edit ff-secondary fs-2'>Edit</button>
          <button class='btn-delete ff-secondary fs-2'>Delete</button>
        </div>
      </li>
      `;
  } );

  // Add event listeners to all Delete buttons
  document.querySelectorAll( '.btn-delete' ).forEach( ( button ) => {
    button.addEventListener( 'click', ( event ) => {
      const productItem = event.target.closest( '.product-item' );
      const productId = productItem.dataset.id;

      console.log( 'btn delete clicked' );

      // Emit a 'delete-product' event
      socket.emit( 'delete-product', productId );
    } );
  } );
} );

// const socket = io();

// const form = document.querySelector( '.products-section' );

// form.addEventListener( 'submit', async ( e ) => {

//   e.preventDefault();

//   try {
//     const product = {
//       title: form.title.value,
//       category: form.category.value,
//       code: form.code.value,
//       shortDescription: form.shortDescription.value,
//       description: form.description.value,
//       thumbnails: form.thumbnails.value,
//       demoUrl: form.demoUrl.value,
//       techStack: form.techStack.value,
//       stock: form.stock.value,
//       price: form.pric.value,
//     };

//     // Emit a 'new-product'
//     socket.emit( 'new-product', product );

//   } catch ( error ) {
//     console.error( error );

//   } finally {
//     // Reset your form here
//     form.reset();
//   }
// } );

// socket.on( "update-products", ( products ) => {
//   const productList = document.querySelector( ".products-list" );
//   productList.innerHTML = "";

//   products.forEach( ( product ) => {
//     productList.innerHTML += `
//       <li class='product-item' data-id='${product.id}'>
//         <img src='${product.thumbnails[ 0 ]}' alt='Image of ${product.title}' class='product-item__image' />
//         <div class='product-item__body'>
//           <p class='ff-secondary fs-2 ls-1'>${product.title}</p>
//           <p>${product.category}</p>
//           <p>${product.shortDescription}</p>
//           <p>Price: ${product.price}</p>
//         </div>
//         <div class='product-item__buttons'>
//           <button class='btn-edit ff-secondary fs-2'>Edit</button>
//           <button class='btn-delete ff-secondary fs-2'>Delete</button>
//         </div>
//       </li>
//       `;
//   } );

//   // Add event listeners to all Delete buttons
//   document.querySelectorAll( ".btn-delete" ).forEach( ( button ) => {
//     button.addEventListener( "click", ( event ) => {
//       const productItem = event.target.closest( ".product-item" );
//       const productId = productItem.dataset.id;

//       console.log( 'btn delete clicked' );

//       // Emit a 'delete-product' event
//       socket.emit( "delete-product", productId );
//     } );
//   } );

// } );





// document.addEventListener( 'DOMContentLoaded', ( event ) => {
//   // Add event listeners to all Edit buttons
//   document.querySelectorAll( '.btn-edit' ).forEach( ( button ) => {
//     button.addEventListener( 'click', ( event ) => {
//       const productItem = event.target.closest( '.product-item' );
//       const productId = productItem.dataset.id;

//       // Fetch the product data
//       axios.get( `/api/products/${productId}` )
//         .then( ( response ) => {
//           const product = response.data;

//           // Populate the form with the product data
//           // This assumes that your form inputs have the same names as your product properties
//           const form = document.querySelector( '.form-section' );
//           Object.keys( product ).forEach( ( key ) => {
//             const input = form.elements[ key ];
//             if ( input ) {
//               input.value = product[ key ];
//             }
//           } );
//         } )
//         .catch( ( error ) => {
//           console.error( error );
//         } );
//     } );
//   } );

//   // Add event listeners to all Delete buttons
//   document.querySelectorAll( '.btn-delete' ).forEach( ( button ) => {
//     button.addEventListener( 'click', ( event ) => {
//       const productItem = event.target.closest( '.product-item' );
//       const productId = productItem.dataset.id;

//       // Emit a 'delete-product' event
//       socket.emit( 'delete-product', productId );
//     } );
//   } );
// } );
