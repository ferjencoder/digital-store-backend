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
const server = http.createServer( app );
const io = new Server( server );

app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( __dirname + '/public' ) )

app.engine( 'handlebars', handlebars.engine() );

// console.log( __dirname );

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'handlebars' );

app.use( '/', viewsRouter );

const port = process.env.PORT || 8080;

if ( !port ) {
    console.error( 'Missing environment variables' );
    process.exit( 1 );
}

app.use( routerCart );
app.use( routerCategories );
app.use( routerProducts );
app.use( routerUsers );

const productsManager = new ProductsManager();

io.on( 'connection', ( socket ) => {
    console.log( 'a user connected' );

    socket.on( 'new-product', async ( product ) => {
        // Add the new product
        await productsManager.addProduct( product );

        // Get the updated list of products
        const products = await productsManager.getProducts();

        // Send the updated list of products to all connected clients
        io.emit( 'update-products', products );
    } );
} );

server.listen( port, () => {
    console.log( `Server running on port => ${port} 🤓` );
} );