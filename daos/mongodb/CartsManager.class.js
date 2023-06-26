

import { cartsModel } from '../mongodb/models/carts.model.js';
import ProductsManager from './ProductsManager.class.js';


export default class CartsManager {

    productsManager = new ProductsManager();

    async createCart () {

        const result = await cartsModel.create( { products: [] } );
        return result;

    };

    async getCarts () {

        const result = await cartsModel.find().lean();
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

    async deleteProductFromCart ( cartId, productId ) {
        // Maybe use syntax like "this.productsManager.getProductById( productId );"
        const cart = await this.getCartById( cartId );
        cart.products.pull( productId );
        await cart.save();

        return;
    };

    async deleteAllProductsFromCart ( cartId ) {
        // Maybe use syntax like "this.productsManager.getProductById( productId );"
        const cart = await this.getCartById( cartId );
        cart.products = [];
        await cart.save();

        return;
    };

    async updateCart ( cartId, products ) {

        try {

            // Fetch the cart by ID
            const cart = await this.getCartById( cartId );

            // Check if the cart exists
            if ( !cart ) {
                throw new Error( 'Cart not found' );
            }

            // Update the products array
            cart.products = products;

            console.log( cart );

            // Save the cart back to the database
            await cart.save();

            // Return the updated cart
            return cart;

        } catch ( error ) {
            console.error( error );
            throw new Error( 'Failed to update cart' );
        }
        // try {

        //     const updatedCart = await cartsModel.findByIdAndUpdate(
        //         { _id: cartId },
        //         { $set: { products: products } }
        //     );

        //     return updatedCart;

        // } catch ( error ) {
        //     console.error( error );
        //     throw new Error( 'Failed to update cart' );
        // }
    }
};


