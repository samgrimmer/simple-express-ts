import { Config } from './config'
import { LoggerInstance } from './logger'
import { Database } from './database';
import { App } from './app';

const startApp = async() => {

    const databaseClient = await Database.initialiseConnection();

    if (databaseClient) {

        LoggerInstance.Info(`Database : ${Config.database.server}:${Config.database.port}/${Config.database.name} is connected..`)
        new App().express;
        
    }

}

startApp();
