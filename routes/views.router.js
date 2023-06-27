

// import CategoriesManager from '../classes/CategoriesManager.class.js';
// import ProductsManager from '../classes/ProductsManager.class.js';
import { Router } from 'express';
import CategoriesManager from '../daos/mongodb/CategoriesManager.class.js';
import ProductsManager from '../daos/mongodb/ProductsManager.class.js';
import { productsModel } from '../daos/mongodb/models/products.model.js';


const router = Router();

const categoriesManager = new CategoriesManager();
const productsManager = new ProductsManager();

router.get( '/products', async ( req, res ) => {

    let page = parseInt( req.query.page ) || 1;
    let sort = req.query.sort || 'asc';
    let filterField = req.query.filter;
    let filterValue = req.query.filterValue;

    try {
        // Build the query options based on the query parameters
        let queryOptions = {
            limit: 5,
            page: page,
            lean: true
        };

        // Handling sorting
        if ( sort ) {
            queryOptions.sort = { price: sort }; // Sorting by price as an example
        }

        // Handling filtering
        let filterOptions = {};
        if ( filterField && filterValue ) {
            filterOptions[ filterField ] = filterValue;
        }

        // Fetch the products with pagination, sorting, and filtering
        let result = await productsModel.paginate( filterOptions, queryOptions );

        // Build the links for pagination
        result.prevLink = result.hasPrevPage ? `http://localhost:8000/products?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8000/products?page=${result.nextPage}` : '';

        const categories = await categoriesManager.getCategories();

        res.render( 'products', { categories, result } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Internal server error' );
    }

} );

router.get( '/product-details/:pid', async ( req, res ) => {

    try {
        const pid = req.params.pid;

        const product = await productsManager.getProductById( pid );

        console.log( product );

        res.render( 'productDetails', { product } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).send( 'Internal server error' );
    }

} );

export default router;

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

// router.get( '/products', async ( req, res ) => {

//     let page = parseInt( req.query.page ) || 1;
//     let sort = req.query.sort || 'asc';
//     let filter = req.query.filter;

//     let filterValue = req.query.filterValue;

//     try {
//         // let result = await productsModel.paginate( {}, {
//         //     limit: 5,
//         //     page,
//         //     sort,
//         //     filter,
//         //     filterValue,
//         //     lean: true
//         // } );

//         // result.prevLink = result.hasPrevPage
//         //     ? `http://localhost:8000/products?page=${result.prevPage}`
//         //     : '';

//         // result.nextLink = result.hasNextPage
//         //     ? `http://localhost:8000/products?page=${result.nextPage}`
//         //     : '';

//         // result.isValid = !( page <= 0 || page > result.totalPages );



//         // const categories = await categoriesManager.getCategories();
//         // // const products = await productsManager.getProducts();
//         // console.log( result );

//         // res.render( 'products', { categories, result } );
//         // res.render( 'products', { products: products } );

//         // } catch ( error ) {
//         //     console.error( error );
//         //     res.status( 500 ).send( 'Internal server error' );
//         // }

//     } );



