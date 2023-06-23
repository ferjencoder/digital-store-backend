

import mongoose from 'mongoose';

const collection = 'carts';

const CartsSchema = new mongoose.Schema( {

    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                },
            },
        ],
    },
} );

export const cartsModel = mongoose.model( collection, CartsSchema );
