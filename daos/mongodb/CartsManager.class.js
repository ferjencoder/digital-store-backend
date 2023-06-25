

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { cartsModel } from '../mongodb/models/carts.model.js';
import ProductsManager from './ProductsManager.class.js';


dotenv.config();
const uri = process.env.MONGODB_URI;

export default class CartsManager {

    // connection = mongoose.connect( uri );

    constructor() {
        this.connectToDatabase();
    }

    connectToDatabase () {
        mongoose
            .connect( uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } )
            .then( () => {
                console.log( 'Connected to MongoDB' );
            } )
            .catch( ( error ) => {
                console.error( 'Error connecting to MongoDB:', error );
            } );
    }

    productsManager = new ProductsManager();

    async createCart () {

        const result = await cartsModel.create( { products: [] } );
        return result;

    };

    async getCarts () {

        const result = await cartsModel.find();
        return result;

    };

    async getCartById ( id ) {

        const result = await cartsModel.findOne( { _id: id } ).populate( 'products.product' );
        return result;

    };

    async addProductToCart ( cartId, productId ) {

        const product = await this.productsManager.getProductById( productId );

        const cart = await this.getCartById( cartId );

        cart.products.push( { product: product } );
        await cart.save();

        return;
    };

};


