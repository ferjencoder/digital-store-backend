

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { categoriesModel } from './models/categories.model.js';


dotenv.config();
const uri = process.env.MONGODB_URI;

export default class CategoriesManager {

    connection = mongoose.connect( uri );

    async createCategory ( category ) {

        const result = await categoriesModel.create( category );
        return result;

    };

    async getCategories () {

        const result = await categoriesModel.find();
        return result;

    };

    async deleteCategory ( category ) {

        const result = await categoriesModel.deleteOne( category );
        return result;

    };

    async getCategory ( category ) {

        const result = await categoriesModel.find( category );
        return result;

    };
};
