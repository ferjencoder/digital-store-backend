import mongoose from "mongoose";

const userCollection = "users";

const userSchema = mongoose.Schema( {
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
} );

const userModel = mongoose.model( userCollection, userSchema );

export default userModel;