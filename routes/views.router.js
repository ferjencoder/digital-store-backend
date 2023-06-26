

// import CategoriesManager from '../classes/CategoriesManager.class.js';
// import ProductsManager from '../classes/ProductsManager.class.js';
import { Router } from 'express';
import CategoriesManager from '../daos/mongodb/CategoriesManager.class.js';
import ProductsManager from '../daos/mongodb/ProductsManager.class.js';
import { productsModel } from '../daos/mongodb/models/products.model.js';


const router = Router();

const categoriesManager = new CategoriesManager();
const productsManager = new ProductsManager();

// router.get('/',(req,res)=>{
//     res.render('home',{})
// })

// router.get( '/', async ( req, res ) => {

//     try {

//         const categories = await categoriesManager.getCategories();
//         const products = await productsManager.getProducts();

//         const handlebarsOptions = {
//             allowProtoPropertiesByDefault: true,
//             allowProtoMethodsByDefault: true
//         };

//         res.render( 'realTimeProducts', { categories, products } );
//         // res.render( 'realTimeProducts', { categories, products, handlebarsOptions } );

//     } catch ( error ) {

//         console.error( error );
//         res.status( 500 ).send( 'Internal server error' );

//     }
// } );

// router.get( '/realtimeproducts', async ( req, res ) => {
//     try {
//         const categories = await categoriesManager.getCategories();

//         const products = await productsManager.getProducts();
//         res.render( 'realTimeProducts', { categories, products } );
//     } catch ( error ) {
//         console.error( error );
//         res.status( 500 ).send( 'Internal server error' );
//     }
// } );

router.get( '/products', async ( req, res ) => {

    let page = parseInt( req.query.page );
    if ( !page ) page = 1;

    let sort = req.query.sort;
    if ( !sort ) sort = 'asc';

    let filter = req.query.filter;
    if ( !filter ) filter = '';

    let filterValue = req.query.filterValue;
    if ( !filterValue ) filterValue = '';

    try {
        let result = await productsModel.paginate( {}, {
            limit: 5,
            page,
            sort,
            filter,
            filterValue,
            lean: true
        } );

        result.prevLink = result.hasPrevPage
            ? `http://localhost:8000/products?page=${result.prevPage}`
            : '';

        result.nextLink = result.hasNextPage
            ? `http://localhost:8000/products?page=${result.nextPage}`
            : '';

        result.isValid = !( page <= 0 || page > result.totalPages );

        const categories = await categoriesManager.getCategories();
        // const products = await productsManager.getProducts();
        console.log( result );

        res.render( 'products', { categories, result } );
        // res.render( 'products', { products: products } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Internal server error' );
    }

} );

export default router;
