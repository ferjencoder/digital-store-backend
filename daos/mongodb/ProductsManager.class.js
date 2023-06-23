

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { productsModel } from '../mongodb/models/products.model.js';

dotenv.config();
const uri = process.env.MONGODB_URI;

export default class ProductsManager {

    connection = mongoose.connect( uri );

    async addProduct ( product ) {
        const result = await productsModel.create( product );
        return result;
    };

    async getProducts ( num = null ) {
        const result = await productsModel.find();
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
            { $set: updateProduct }
        );
        return result;
    };

    async deleteProduct ( id ) {
        const result = await productsModel.deleteOne( { _id: id } );
        return result;
    };

};
