

import mongoose from "mongoose";

const collection = "products";

const ProductsSchema = mongoose.Schema( {
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
} );

const productsModel = mongoose.model( collection, ProductsSchema );

export default productsModel;