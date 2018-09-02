import * as express from 'express';
import { UserController } from './controller/userController'

export class Route {

    public Router: express.Router;

    constructor() {

        this.Router = express.Router({
            caseSensitive: false,
            mergeParams: true,
            strict: false,
        });

        this.configureRoutes();

    }

    private configureRoutes() : void {

        const userController = new UserController();

        this.Router.get('/user/:page?/:limit?', userController.list);
        this.Router.get('/user/:email', userController.getByEmail);
        this.Router.post('/user', userController.create);
        this.Router.patch('/user', userController.update);
        this.Router.delete('/user/:id', userController.delete);
        
    }
    
}