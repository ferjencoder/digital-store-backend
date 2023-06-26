

// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

import { categoriesModel } from './models/categories.model.js';


// dotenv.config();
// const uri = process.env.MONGODB_URI;

export default class CategoriesManager {

    // connection = mongoose.connect( uri );

    // constructor() {
    //     this.connectToDatabase();
    // }

    // connectToDatabase () {
    //     mongoose
    //         .connect( uri, {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true,
    //         } )
    //         .then( () => {
    //             console.log( 'Connected to MongoDB' );
    //         } )
    //         .catch( ( error ) => {
    //             console.error( 'Error connecting to MongoDB:', error );
    //         } );
    // }

    async createCategory ( category ) {

        const result = await categoriesModel.create( { name: category } );
        return result;

    };

    async getCategories () {

        const result = await categoriesModel.find().lean();
        return result;

    };

    async deleteCategory ( categoryId ) {

        const result = await categoriesModel.deleteOne( categoryId );
        return result;

    };

    async getCategory ( categoryId ) {

        const result = await categoriesModel.find( categoryId );
        return result;

    };
};
