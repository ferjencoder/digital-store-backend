

import mongoose from "mongoose";

const collection = "products";

const ProductsSchema = new mongoose.Schema( {
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnails: {
        type: [ String ],
        required: true
    },
    demoUrl: {
        type: String,
        required: true
    },
    techStack: {
        type: [ String ],
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
} );

export const productsModel = mongoose.model( collection, ProductsSchema );
