

import mongoose from "mongoose";

const collection = "categories";

const CategoriesSchema = new mongoose.Schema( {

    category: {
        type: String,
        required: true
    }

} );

export const categoriesModel = mongoose.model( collection, CategoriesSchema );
