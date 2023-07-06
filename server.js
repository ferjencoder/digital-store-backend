
// nodemon server.js

// Import required modules
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import connectToDatabase from './utils/db.js';
import __dirname from './utils/utils.js'


import ProductsManager from './daos/mongodb/ProductsManager.class.js';
import viewsRouter from './routes/views.router.js';
import { routerCart } from './routes/carts.router.js';
import { routerCategories } from './routes/categories.router.js';
import { routerProducts } from './routes/products.router.js';
import { routerUsers } from './routes/users.router.js';
import { routerLogin } from './routes/login.router.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the MongoDB database
connectToDatabase();

// Set the port number
const port = process.env.PORT || 8080;

// Middleware
app.use( cors() );
app.use( cookieParser() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, '/public' ) ) );

// Start the server after the database connection is established
mongoose.connection.once( 'open', () => {
  // Start the HTTP server
  const httpServer = app.listen( port, () => {
    console.log( `Server is running on port ${port}` );
  } );

  // Initialize Socket.IO server
  const socketServer = new Server( httpServer );

  // Configure handlebars
  app.engine( 'handlebars', handlebars.engine( {
    defaultLayout: 'main',
    layoutsDir: path.join( __dirname, 'views/layouts/' ),
    partialsDir: path.join( __dirname, 'views/' ),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    }
  } ) );

  app.set( 'view engine', 'handlebars' );
  app.set( 'views', path.join( __dirname, 'views' ) );

  // Create an instance of ProductsManager
  const productsManager = new ProductsManager();

  // Emit all products to connected sockets on initial connection
  ( async () => {

    const products = await productsManager.getProducts();
    socketServer.emit( 'update-products', products );

  } )();

  // Handle socket events
  socketServer.on( 'connection', ( socket ) => {
    // Handle "new-product" event
    socket.on( 'new-product', async ( newProduct ) => {

      try {

        await productsManager.addProduct( newProduct );
        socketServer.emit( 'update-products', await productsManager.getProducts() );

      } catch ( error ) {
        console.error( error );
      }
    } );

    // Handle "delete-product" event
    socket.on( 'delete-product', async ( productID ) => {

      try {
        await productsManager.deleteProduct( productID );
        socketServer.emit( 'update-products', await productsManager.getProducts() );

      } catch ( error ) {
        console.error( error );
      }

    } );

  } );


  // Pass the socket server to routes through request object
  app.use( ( req, res, next ) => {
    req.socketServer = socketServer;
    next();
  } );

  // Register routers
  app.get( '/', ( req, res ) => {
    res.render( 'login' );
  } );

  // app.use( '/', viewsRouter );
  app.use( viewsRouter );
  app.use( routerLogin );
  app.use( routerCategories );
  app.use( routerCart );
  app.use( routerProducts );
  app.use( routerUsers );

  // Error handling middleware
  app.use( ( err, req, res, next ) => {
    console.error( err.stack );
    res.status( 500 ).send( 'Something broke!' );
  } );

} );

