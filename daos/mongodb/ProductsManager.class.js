

import mongoose from 'mongoose';
import { productsModel } from './models/products.model';


export default class ProductsManager {

    connection = mongoose.connect( 'mongodb+srv://ferjencoder:XR05p6wWLPT9sS5B@digitalstore.sqxyq1o.mongodb.net/' );

    async addProduct ( product ) {
        let result = await productsModel.create( product );
        return result;
    };

    async getProducts ( num = null ) {
        let result = await productsModel.find();
        return result;
    };

    async getProductById ( id ) {
        let result = await productsModel.findOne( { _id: id } );
        return result;
    };

    async getProductsByCategory ( category ) {
        let result = await productsModel.find( category );
        return result;
    };

    async updateProduct ( id, productData ) {
        let result = await productsModel.updateOne(
            { _id: id },
            { $set: updateProduct }
        );
        return result;
    };

    async deleteProduct ( id ) {
        let result = await productsModel.deleteOne( { _id: id } );
        return result;
    };

};
