

import { Router } from 'express';
import UsersManager from '../classes/UsersManager.class.js';


export const routerUsers = Router();

const usersManager = new UsersManager();

routerUsers.get( '/api/users', async ( req, res ) => {

    try {
        const users = await usersManager.getUsers();
        res.json( users );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    };

} );

routerUsers.post( '/api/user', async ( req, res ) => {

    try {
        const newUser = req.body;
        await usersManager.createUser( newUser );
        res.status( 201 ).json( { message: 'User created successfully' } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    };

} );

routerUsers.delete( '/api/user/:uid', async ( req, res ) => {

    try {
        const userId = req.params.uid;
        await usersManager.deleteUser( userId );
        res.json( { message: 'User deleted successfully' } );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    };

} );

routerUsers.get( '/api/user/:uid', async ( req, res ) => {

    try {
        const userId = req.params.uid;
        console.log( userId );

        const user = await usersManager.getUserById( Number( userId ) );
        res.json( user );

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    };

} );

routerUsers.post( '/api/login', async ( req, res ) => {
    try {
        const { email, password } = req.body;

        // Authenticate the user based on the email and password
        const user = await usersManager.authenticateUser( email, password );

        // Assuming the authentication is successful, generate a token for the user
        const token = generateToken( user );

        // Send the token back to the client
        res.json( { token } );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Internal server error' } );
    }
} );


// module.exports = routerUsers;