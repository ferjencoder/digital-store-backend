

import { Router } from 'express';
// import CategoriesManager from '../classes/CategoriesManager.class.js';
// import ProductsManager from '../classes/ProductsManager.class.js';
import CategoriesManager from '../daos/mongodb/CategoriesManager.class.js';
import ProductsManager from '../daos/mongodb/ProductsManager.class.js';


const router = Router();

const categoriesManager = new CategoriesManager();
const productsManager = new ProductsManager();

router.get( '/', async ( req, res ) => {

    try {

        const categories = await categoriesManager.getCategories();
        const products = await productsManager.getProducts();
        res.render( 'realTimeProducts', { categories, products } );
        // res.render( 'home', {
        //     title: "Inicio",
        //     products: products
        // } )

    } catch ( error ) {

        console.error( error );
        res.status( 500 ).send( 'Internal server error' );

    }
} );

export default router;
