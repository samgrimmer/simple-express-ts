import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { Config } from './config';
import { LoggerInstance } from './logger'
import { Route } from './route';
import { ErrorHandler, RequestHandler } from './middleware';

export class App {

	public express: express.Application;

	constructor() {

		this.express = express();

		this.middleware();
		this.routes();
		this.customMiddleware();

		this.express.listen(Config.app.port, () =>  {
			LoggerInstance.Info(`${Config.app.name} listening on : ${Config.app.port}`);
		});

	}

	private middleware(): void {

		this.express.use(cors());
		this.express.options('*', cors());
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({extended: false}));

	}

	private routes(): void {

		this.express.use('/', new Route().Router)

	}

	private customMiddleware(): void {

		this.express.use(RequestHandler);
		this.express.use(ErrorHandler);

	}
	
}