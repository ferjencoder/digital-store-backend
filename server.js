/*****************************************************
    Routes de Usuarios / Auth
    hots + /api/auth
******************************************************/

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './views/views.router.js';

import ProductsManager from './classes/ProductsManager.class.js';

import { routerCart } from './routes/carts.router.js';
import { routerCategories } from './routes/categories.router.js';
import { routerProducts } from './routes/products.router.js';
import { routerUsers } from './routes/users.router.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const httpServer = app.listen( port, () => {
    console.log( `Server running on port => ${port} 🤓` )
} )

const socketServer = new Server( httpServer );

app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( __dirname + '/public' ) )

app.engine( 'handlebars', handlebars.engine() );

// console.log( __dirname );

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'handlebars' );

app.use( '/', viewsRouter );


if ( !port ) {
    console.error( 'Missing environment variables' );
    process.exit( 1 );
}

app.use( routerCart );
app.use( routerCategories );
app.use( routerProducts );
app.use( routerUsers );

const productsManager = new ProductsManager();

socketServer.on( "connection", ( socket ) => {

    socket.on( "new-product", async ( product ) => {
        try {
            const newProduct = await productsManager.addProduct( product );
            socketServer.emit( "update-products", await productsManager.getProducts() );

        } catch ( error ) {
            console.error( error );
        }
    } );

} );
