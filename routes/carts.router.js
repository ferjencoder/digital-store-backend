

import { Router } from 'express';
import CartsManager from '../daos/mongodb/CartsManager.class.js';
// import CartsManager from '../classes/CartsManager.class.js';

export const routerCart = Router();

const cartsManager = new CartsManager();

// POST /api/carts/
routerCart.post( '/api/carts/', async ( req, res ) => {
    try {
        const newCart = await cartsManager.createCart();
        res.status( 201 ).json( newCart );

    } catch ( error ) {
        res.status( 500 ).json( { error: 'Failed to create cart' } );
    }
} );

// GET /api/carts/
routerCart.get( '/api/carts/', async ( req, res ) => {
    try {
        const allCarts = await cartsManager.getCarts();
        res.status( 201 ).json( allCarts );

    } catch ( error ) {
        res.status( 500 ).json( { error: 'Failed to find carts' } );
    }
} );

// GET /api/carts/:cid
routerCart.get( '/api/carts/:cid', async ( req, res ) => {

    try {
        const { cid } = req.params;
        const cart = await cartsManager.getCartById( cid );

        res.status( 201 ).json( cart );

    } catch ( error ) {
        res.status( 500 ).json( { error: 'Failed to fetch cart' } );
    };

} );

// PUT /api/carts/:cid
routerCart.put( '/api/carts/:cid', async ( req, res ) => {
    try {
        const { cid } = req.params;
        const products = req.body.products; // Expecting an array of products in the request body

        // Input validation (optional but recommended)
        // if ( !Array.isArray( products ) ) {
        //     return res.status( 400 ).json( { error: 'Expected an array of products' } );
        // }

        // Call the updateCart method from the CartsManager
        const updatedCart = await cartsManager.updateCart( cid, products );

        // Send the updated cart as a response
        res.status( 200 ).json( updatedCart );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { error: 'Failed to update cart' } );
    }
} );


// POST /api/carts/:cid/product/:pid
routerCart.post( '/api/carts/:cid/product/:pid', async ( req, res ) => {

    try {
        console.log( req.params );

        const { cid, pid } = req.params;
        const cart = await cartsManager.addProductToCart( cid, pid );

        res.status( 201 ).json( cart );
        // res.json( cart );

    } catch ( error ) {
        res.status( 500 ).json( { error: 'Failed to add product to cart' } );
    };

} );

// POST /api/carts/:cid/product/:pid
routerCart.delete( '/api/carts/:cid/product/:pid', async ( req, res ) => {

    try {

        const { cid, pid } = req.params;
        const cart = await cartsManager.deleteProductFromCart( cid, pid );

        res.status( 201 ).json( cart );
        // res.json( cart );

    } catch ( error ) {
        res.status( 500 ).json( { error: 'Failed to delete product from cart' } );
    };

} );

// POST /api/carts/:cid/product/:pid
routerCart.delete( '/api/carts/:cid', async ( req, res ) => {

    try {
        const { cid } = req.params;
        const cart = await cartsManager.deleteAllProductsFromCart( cid );
        res.status( 201 ).json( cart );
        // res.json( cart );

    } catch ( error ) {
        res.status( 500 ).json( { error: 'Failed to delete all products from cart' } );
    };

} );
