

import express from 'express';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import cors from 'cors';
import dotenv from 'dotenv';
import handlebars from 'express-handlebars';
import path from 'path';

import viewsRouter from './routes/views.router.js';
// import ProductsManager from './classes/ProductsManager.class.js';
import { routerCart } from './routes/carts.router.js';
import { routerCategories } from './routes/categories.router.js';
import { routerProducts } from './routes/products.router.js';
import { routerUsers } from './routes/users.router.js';
import { routerAuth } from './routes/auth.router.js';

import ProductsManager from './daos/mongodb/ProductsManager.class.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const httpServer = app.listen( port, () => {
  console.log( `Server running on port => ${port} 🤓` );
} );

const socketServer = new Server( httpServer );

// Middleware
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, '/public' ) ) );

// Configure handlebars
app.engine( 'handlebars', handlebars.engine( {
  layoutsDir: path.join( __dirname, 'views/layouts/' ),
  defaultLayout: 'main',
  partialsDir: path.join( __dirname, 'views/' )
} ) );
app.set( 'view engine', 'handlebars' );
app.set( 'views', path.join( __dirname, 'views' ) );

// Register routers
app.use( '/', viewsRouter );
app.use( '/login', routerAuth );
app.use( routerCart );
app.use( routerCategories );
app.use( routerProducts );
app.use( routerUsers );

// Create an instance of ProductsManager
const productsManager = new ProductsManager();

// Emit all products to connected sockets on initial connection
socketServer.emit( 'update-products', await productsManager.getProducts() );

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



// /*****************************************************
//     Routes de Usuarios / Auth
//     hots + /api/auth
// ******************************************************/
//
// import express from 'express';
// import { Server } from 'socket.io';
// import __dirname from './utils.js';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import handlebars from 'express-handlebars';
// import path from 'path';
// import viewsRouter from './routes/views.router.js';
// import ProductsManager from './classes/ProductsManager.class.js';
// import { routerCart } from './routes/carts.router.js';
// import { routerCategories } from './routes/categories.router.js';
// import { routerProducts } from './routes/products.router.js';
// import { routerUsers } from './routes/users.router.js';
// import { routerAuth } from './routes/auth.router.js';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 8080;

// const httpServer = app.listen(port, () => {
//   console.log(`Server running on port => ${port} 🤓`);
// });

// const socketServer = new Server(httpServer);

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '/public')));

// // Configure handlebars
// app.engine('handlebars', handlebars.engine({
//   layoutsDir: path.join(__dirname, 'views/layouts/'),
//   defaultLayout: 'main',
//   partialsDir: path.join(__dirname, 'views/')
// }));
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'));

// // Register routers
// app.use('/', viewsRouter);
// app.use('/login', routerAuth);
// app.use(routerCart);
// app.use(routerCategories);
// app.use(routerProducts);
// app.use(routerUsers);

// // Create an instance of ProductsManager
// const productsManager = new ProductsManager();

// // Emit all products to connected sockets on initial connection
// socketServer.emit('update-products', await productsManager.getProducts());

// // Handle socket events
// socketServer.on('connection', (socket) => {
//   // Handle "new-product" event
//   socket.on('new-product', async (newProduct) => {
//     try {
//       await productsManager.addProduct(newProduct);
//       socketServer.emit('update-products', await productsManager.getProducts());
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   // Handle "delete-product" event
//   socket.on('delete-product', async (productID) => {
//     try {
//       await productsManager.deleteProduct(productID);
//       socketServer.emit('update-products', await productsManager.getProducts());
//     } catch (error) {
//       console.error(error);
//     }
//   });
// });
