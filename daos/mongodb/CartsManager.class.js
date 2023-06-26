

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

        const cart = await this.getCartById( cartId );
        cart.products.pull( productId );
        await cart.save();

        return;
    };

    async deleteAllProductsFromCart ( cartId ) {

        const cart = await this.getCartById( cartId );
        cart.products = [];
        await cart.save();

        return;
    };

};


