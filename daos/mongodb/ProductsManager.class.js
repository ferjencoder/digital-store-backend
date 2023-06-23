

// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath( import.meta.url );
// const __dirname = dirname( __filename );

// const PRODUCTS_FILE_PATH = path.resolve( __dirname, '../data/products.json' );


export default class ProductsManager {

    // Utility methods
    async readProductsFromFile () {
        const data = await fs.promises.readFile( PRODUCTS_FILE_PATH, 'utf-8' );
        return JSON.parse( data );
    };

    async writeProductsToFile ( products ) {
        await fs.promises.writeFile( PRODUCTS_FILE_PATH, JSON.stringify( products, null, '\t' ) );
    };

    // CRUD operations
    async getProducts ( num ) {

    };

    async addProduct ( product ) {

    };

    async updateProduct ( id, productData ) {

    };

    async deleteProduct ( id ) {

    };

    async getProductsByCategory ( category ) {

    };

    async getProductById ( id ) {

    };

};
