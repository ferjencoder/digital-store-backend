import { Router } from 'express';
import { isAdmin, isEmployee } from '../middleware/authMiddleware.js';

export const routerLogin = Router();

routerLogin.get( '/login', async ( req, res ) => {
    try {
        // const categories = await categoriesManager.getCategories();
        // console.log( "Categories Data:", categories );
        // const products = await productsManager.getProducts();
        // res.render( 'realTimeProducts', { categories, products } );
        res.render( 'login' );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Internal server error' );
    }
} );


// Routes accessible to admins and employees
routerLogin.use( [ '/productsManager', '/chat' ], isAdmin, isEmployee, ( req, res, next ) => {
    // Handle the request for productsManager and chat routes
    // Middleware order matters here, both isAdmin and isEmployee middleware are applied
    // Next middleware or route handler is only called if both conditions are met
    next();
} );

// Route accessible to admins, employees, and users
routerLogin.use( '/products', isAdmin, isEmployee, ( req, res, next ) => {
    // Handle the request for the products route
    // Middleware order matters here, both isAdmin and isEmployee middleware are applied
    // Next middleware or route handler is only called if both conditions are met
    next();
} );

// Route for login
// routerAuth.get( '/login', async ( req, res ) => {

//     try {
//         res.render( 'login', { users } ); // Render the 'login.hbs' template
//     } catch ( error ) {

//         console.error( error );
//         res.status( 500 ).send( 'Internal server error' );

//     }
// } );

// routerLogin.get( '/login', async ( req, res ) => {
//     try {
//         // const categories = await categoriesManager.getCategories();
//         // console.log( "Categories Data:", categories );
//         // const products = await productsManager.getProducts();
//         // res.render( 'realTimeProducts', { categories, products } );
//         res.render( 'login' );
//     } catch ( error ) {
//         console.error( error );
//         res.status( 500 ).send( 'Internal server error' );
//     }
// } );



// // Routes accessible to admins and employees
// routerAuth.use( [ '/productsManager', '/chat' ], isAdmin, isEmployee, ( req, res, next ) => {
//     // Handle the request for productsManager and chat routes
//     // Middleware order matters here, both isAdmin and isEmployee middleware are applied
//     // Next middleware or route handler is only called if both conditions are met
//     next();
// } );

// // Route accessible to admins, employees, and users
// routerAuth.use( '/products', isAdmin, isEmployee, ( req, res, next ) => {
//     // Handle the request for the products route
//     // Middleware order matters here, both isAdmin and isEmployee middleware are applied
//     // Next middleware or route handler is only called if both conditions are met
//     next();
// } );

