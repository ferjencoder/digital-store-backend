

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

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
        const { name, email, password, role, userImg, userName } = info;

        if ( !name || !email || !password || !role || !userImg || !userName ) {
            throw new Error(
                'Missing user mandatory info (name, email, password, role, userImg, userName)'
            );
        }

        const users = await this.getUsers();
        const newUser = {
            id: Math.max( ...users.map( ( user ) => user.id ) ) + 1,
            name,
            email,
            password,
            role,
            userImg,
            userName,
        };

        users.push( newUser );
        await fs.promises.writeFile(
            USERS_FILE_PATH,
            JSON.stringify( users, null, '\t' )
        );
        return newUser;
    }


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