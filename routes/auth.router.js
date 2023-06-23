import { Router } from 'express';
import { isAdmin, isEmployee } from '../middleware/authMiddleware.js';

export const routerAuth = Router();

// Route for login
routerAuth.get( '/login', ( req, res ) => {
    res.render( 'login' ); // Render the 'login.hbs' template
} );

// Routes accessible to admins and employees
routerAuth.use( [ '/productsManager', '/chat' ], isAdmin, isEmployee, ( req, res, next ) => {
    // Handle the request for productsManager and chat routes
    // Middleware order matters here, both isAdmin and isEmployee middleware are applied
    // Next middleware or route handler is only called if both conditions are met
    next();
} );

// Route accessible to admins, employees, and users
routerAuth.use( '/products', isAdmin, isEmployee, ( req, res, next ) => {
    // Handle the request for the products route
    // Middleware order matters here, both isAdmin and isEmployee middleware are applied
    // Next middleware or route handler is only called if both conditions are met
    next();
} );
