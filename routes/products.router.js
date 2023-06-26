

import { Router } from 'express';
import ProductsManager from '../daos/mongodb/ProductsManager.class.js';

// import ProductsManager from '../classes/ProductsManager.class.js';


export const routerProducts = Router();

const productManager = new ProductsManager();

routerProducts.get( '/api/products', async ( req, res ) => {

    try {
        const limit = Number( req.query.limit );
        const page = Number( req.query.page );
        const sort = req.query.sort;
        const filter = req.query.filter;
        const filterValue = req.query.filterValue;

        const products = await productManager.getProducts(
            limit,
            page,
            sort,
            filter,
            filterValue
        );

        res.status( 200 ).json( products );
        // res.send( { status: 'success' } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }

} );

routerProducts.get( '/api/products/:pid', async ( req, res ) => {

    try {
        const product = await productManager.getProductById( req.params.pid );

        if ( !product ) {
            res.status( 404 ).send( { status: 'error', error: 'Product not found' } );
        } else {
            res.json( product );
        }

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }

} );

routerProducts.post( '/api/products', async ( req, res ) => {

    try {
        let newProduct = req.body;
        await productManager.addProduct( newProduct );

        const products = await productManager.getProducts();

        req.socketServer.sockets.emit( 'update-products', products );
        res.send( { status: 'successfull' } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }

} );

routerProducts.put( '/api/products/:pid', async ( req, res ) => {

    try {
        const updatedProduct = await productManager.updateProduct( req.params.pid, req.body );

        if ( !updatedProduct ) {
            res.status( 404 ).send( { status: 'error', error: 'Product not found' } );
        } else {
            res.json( updatedProduct );
        }

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }

} );

routerProducts.delete( '/api/products/:pid', async ( req, res ) => {

    try {
        const deleted = await productManager.deleteProduct( req.params.pid );
        if ( !deleted ) {
            res.status( 404 ).send( { status: 'error', error: 'Product not found' } );
        } else {
            res.json( { status: 'success', message: 'Product deleted' } );
        }

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { status: 'error', error: 'Something went wrong' } );
    }

} );