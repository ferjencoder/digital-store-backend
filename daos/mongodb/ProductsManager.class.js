

import { productsModel } from '../mongodb/models/products.model.js';

export default class ProductsManager {

    async addProduct ( product ) {
        const result = await productsModel.create( product );
        return result;
    };

    // async getProducts (
    //     limit = 10,
    //     page = 1,
    //     sort = 'price:asc',
    //     filter = null,
    //     filterValue = null
    // ) {

    //     let whereOptions = {};

    //     if ( filter && filterValue ) {
    //         whereOptions = { [ filter ]: filterValue };
    //     }

    //     // Split the sort parameter into field and order
    //     const [ sortField, sortOrder ] = sort.split( ':' );
    //     const sortOptions = { [ sortField ]: sortOrder === 'desc' ? -1 : 1 };

    //     const result = await productsModel.paginate( whereOptions, {
    //         limit: limit,
    //         page: page,
    //         sort: sortOptions
    //     } );

    //     console.log( result );

    //     return result;
    // }

    async getProducts (
        limit = 10,
        page = 1,
        sort = 'asc',
        filter = null,
        filterValue = null
    ) {

        let whereOptions = {};

        if ( filter && filterValue ) {
            whereOptions = { [ filter ]: filterValue };
        }

        // if ( filter != '' && filterValue != '' ) {
        //     whereOptions = { [ filter ]: filterValue };
        // }

        // Determine the sort order
        let sortOrder;
        if ( sort === 'desc' ) {
            sortOrder = -1;
        } else {
            sortOrder = 1; // Default to ascending if anything other than 'desc' is passed
        }

        const result = await productsModel.paginate( whereOptions,
            {
                limit: limit,
                page: page,
                sort: { price: sortOrder },
            }
        );

        return result;
    };

    async getProductById ( id ) {
        const result = await productsModel.findOne( { _id: id } );
        return result;
    };

    async getProductsByCategory ( category ) {
        const result = await productsModel.find( category );
        return result;
    };

    async updateProduct ( id, productData ) {
        const result = await productsModel.updateOne(
            { _id: id },
            { $set: productData }
        );
        return result;
    };

    async deleteProduct ( id ) {
        const result = await productsModel.deleteOne( { _id: id } );
        return result;
    };

};
