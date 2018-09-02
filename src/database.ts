import mongoose = require('mongoose');
import { Config } from './config';

export class Database {

    static initialiseConnection = async() => {

        const connectionString = `mongodb://${Config.database.server}:${Config.database.port}/${Config.database.name}`;

        const options = {
            useNewUrlParser: true,
            autoReconnect: true,
            autoIndex: false
        };

        return await mongoose.connect(connectionString, options);
        
    }
    
}