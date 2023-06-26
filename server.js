

// Import required modules
import express from 'express';
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

// Start the server after the database connection is established
mongoose.connection.once( 'open', () => {
  // Start the HTTP server
  const httpServer = app.listen( port, () => {
    console.log( `Server is running on port ${port}` );
  } );

  // Initialize Socket.IO server
  const socketServer = new Server( httpServer );

  // Middleware
  app.use( cors() );
  app.use( express.json() );
  app.use( express.urlencoded( { extended: true } ) );
  app.use( express.static( path.join( __dirname, '/public' ) ) );

  // Configure Handlebars as the view engine
  // app.engine( 'handlebars', handlebars.engine( {
  //   defaultLayout: 'main',
  //   layoutsDir: path.join( __dirname, 'views/layouts/' ),
  //   partialsDir: path.join( __dirname, 'views/' ),
  //   runtimeOptions: {
  //     allowProtoPropertiesByDefault: true,
  //     allowProtoMethodsByDefault: true,
  //   }
  // } ) );
  // app.set( 'view engine', 'handlebars' );
  // app.set( 'views', path.join( __dirname, 'views' ) );

  // Configure handlebars
  app.engine( 'handlebars', handlebars.engine( {
    defaultLayout: 'main',
    layoutsDir: path.join( __dirname, 'views/layouts/' ),
    partialsDir: path.join( __dirname, 'views/' ),
    // handlebars: allowInsecurePrototypeAccess( Handlebars ),
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
  app.use( '/', viewsRouter );
  app.use( routerLogin );
  app.use( routerCategories );
  app.use( routerCart );
  app.use( routerProducts );
  app.use( routerUsers );
} );


// import express from 'express';
// import mongoose from 'mongoose';
// import handlebars from 'express-handlebars';
// import connectToDatabase from './utils/db.js';
// import __dirname from './utils/utils.js'
// import { Server } from 'socket.io';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import path from 'path';
// import viewsRouter from './routes/views.router.js';
// import ProductsManager from './daos/mongodb/ProductsManager.class.js';
// import { routerCart } from './routes/carts.router.js';
// import { routerCategories } from './routes/categories.router.js';
// import { routerProducts } from './routes/products.router.js';
// import { routerUsers } from './routes/users.router.js';
// import { routerLogin } from './routes/login.router.js';

// dotenv.config();

// const app = express();

// // Connect to the database
// connectToDatabase();


// const port = process.env.PORT || 8080;

// // Start the server after the database connection is established
// mongoose.connection.once( 'open', () => {
//   const port = process.env.PORT || 8080;
//   app.listen( port, () => {
//     console.log( `Server is running on port ${port}` );
//   } );
// } );

// const httpServer = app.listen( port, () => {
//   console.log( `Server running on port => ${port} 🤓` );
// } );

// const socketServer = new Server( httpServer );

// // Middleware
// app.use( cors() );
// app.use( express.json() );
// app.use( express.urlencoded( { extended: true } ) );
// app.use( express.static( path.join( __dirname, '/public' ) ) );

// // Configure handlebars
// app.engine( 'handlebars', handlebars.engine( {
//   defaultLayout: 'main',
//   layoutsDir: path.join( __dirname, 'views/layouts/' ),
//   partialsDir: path.join( __dirname, 'views/' ),
//   // handlebars: allowInsecurePrototypeAccess( Handlebars ),
//   runtimeOptions: {
//     allowProtoPropertiesByDefault: true,
//     allowProtoMethodsByDefault: true,
//   }
// } ) );

// app.set( 'view engine', 'handlebars' );
// app.set( 'views', path.join( __dirname, 'views' ) );

// // Create an instance of ProductsManager
// const productsManager = new ProductsManager();

// // Emit all products to connected sockets on initial connection
// ( async () => {
//   const products = await productsManager.getProducts();
//   socketServer.emit( 'update-products', products );
// } )();

// // Handle socket events
// socketServer.on( 'connection', ( socket ) => {
//   // Handle "new-product" event
//   socket.on( 'new-product', async ( newProduct ) => {
//     try {
//       await productsManager.addProduct( newProduct );
//       socketServer.emit( 'update-products', await productsManager.getProducts() );
//     } catch ( error ) {
//       console.error( error );
//     }
//   } );

//   // Handle "delete-product" event
//   socket.on( 'delete-product', async ( productID ) => {
//     try {
//       await productsManager.deleteProduct( productID );
//       socketServer.emit( 'update-products', await productsManager.getProducts() );
//     } catch ( error ) {
//       console.error( error );
//     }
//   } );
// } );

// app.use( ( req, res, next ) => {
//   req.socketServer = socketServer;
//   next();
// } );

// // Register routers
// // app.use( '/api/categories', routerCategories );
// app.use( '/', viewsRouter );
// app.use( routerLogin );
// app.use( routerCategories );
// app.use( routerCart );
// app.use( routerProducts );
// app.use( routerUsers );


// // /*****************************************************
// //     Routes de Usuarios / Auth
// //     hots + /api/auth
// // ******************************************************/

// // import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
// // import express from 'express';
// // import { Server } from 'socket.io';
// // import __dirname from './utils.js';
// // import cors from 'cors';
// // import dotenv from 'dotenv';
// // import expressHandlebars from 'express-handlebars';
// // import Handlebars from 'handlebars';
// // import path from 'path';
// // import viewsRouter from './routes/views.router.js';
// // // import ProductsManager from './classes/ProductsManager.class.js';
// // import ProductsManager from './daos/mongodb/ProductsManager.class.js';
// // import { routerCart } from './routes/carts.router.js';
// // import { routerCategories } from './routes/categories.router.js';
// // import { routerProducts } from './routes/products.router.js';
// // import { routerUsers } from './routes/users.router.js';
// // import { routerAuth } from './routes/auth.router.js';

// // dotenv.config();

// // const app = express();
// // const port = process.env.PORT || 8080;

// // const httpServer = app.listen( port, () => {
// //   console.log( `Server running on port => ${port} 🤓` );
// // } );

// // const socketServer = new Server( httpServer );

// // // Middleware
// // app.use( cors() );
// // app.use( express.json() );
// // app.use( express.urlencoded( { extended: true } ) );
// // app.use( express.static( path.join( __dirname, '/public' ) ) );

// // // Disable prototype access check in Handlebars
// // const handlebarsInstance = expressHandlebars.create( {
// //   handlebars: allowInsecurePrototypeAccess( Handlebars ),
// //   layoutsDir: path.join( __dirname, 'views/layouts/' ),
// //   defaultLayout: 'main',
// //   partialsDir: path.join( __dirname, 'views/' )
// // } );


// // // Configure handlebars
// // app.engine( 'handlebars', handlebarsInstance.engine );
// // app.set( 'view engine', 'handlebars' );
// // app.set( 'views', path.join( __dirname, 'views' ) );

// // // Register routers
// // app.use( '/api/categories', routerCategories );
// // app.use( '/', viewsRouter );
// // app.use( '/login', routerAuth );
// // app.use( routerCart );
// // app.use( routerProducts );
// // app.use( routerUsers );

// // // Create an instance of ProductsManager
// // const productsManager = new ProductsManager();

// // // Emit all products to connected sockets on initial connection
// // ( async () => {
// //   const products = await productsManager.getProducts();
// //   socketServer.emit( 'update-products', products );
// // } )();

// // // Handle socket events
// // socketServer.on( 'connection', ( socket ) => {
// //   // Handle "new-product" event
// //   socket.on( 'new-product', async ( newProduct ) => {
// //     try {
// //       await productsManager.addProduct( newProduct );
// //       socketServer.emit( 'update-products', await productsManager.getProducts() );
// //     } catch ( error ) {
// //       console.error( error );
// //     }
// //   } );

// //   // Handle "delete-product" event
// //   socket.on( 'delete-product', async ( productID ) => {
// //     try {
// //       await productsManager.deleteProduct( productID );
// //       socketServer.emit( 'update-products', await productsManager.getProducts() );
// //     } catch ( error ) {
// //       console.error( error );
// //     }
// //   } );
// // } );
