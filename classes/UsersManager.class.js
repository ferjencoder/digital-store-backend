

import path from 'path';
import fs from 'fs';
import __dirname from '../utils.js';

const USERS_FILE_PATH = path.resolve( __dirname, '../data/users.json' );


export default class UsersManager {

    async getUsers () {

        if ( fs.existsSync( USERS_FILE_PATH ) ) {
            const data = await fs.promises.readFile( USERS_FILE_PATH, 'utf-8' );
            const users = JSON.parse( data );
            return users;

        } else {
            return [];
        };

    };

    async createUser ( info ) {

        const users = await this.getUsers();

        // Check if the file is created
        if ( users.length === 0 ) {
            info.id = 1;
        } else {
            info.id = users[ users.length - 1 ].id + 1;
        }

        users.push( info );
        await fs.promises.writeFile( USERS_FILE_PATH, JSON.stringify( users, null, '\t' ) );
    };

    async deleteUser ( id ) {

        const users = await this.getUsers();

        const filteredUsers = users.filter( ( user ) => {
            return user.id != id;
        } );

        await fs.promises.writeFile( USERS_FILE_PATH, JSON.stringify( filteredUsers, null, '\t' ) );
    };

    async getUserById ( id ) {

        const users = await this.getUsers();

        const searchedUser = users.find( ( user ) => {
            return user.id == id;
        } );

        return searchedUser ? searchedUser : 'User Not Found';

    };

    async authenticateUser ( email, password ) {
        const users = await this.getUsers();

        const user = users.find( ( user ) => user.email === email && user.password === password );

        if ( !user ) {
            throw new Error( 'Invalid email or password' );
        }

        console.log( 'logged in!' );


        return user;
    };
};