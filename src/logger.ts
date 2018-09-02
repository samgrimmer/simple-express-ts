import * as winston from 'winston';

class Logger {

    public logger: winston.Logger;
    
    constructor() {

        this.init();

    }

    private init(): void {

        this.logger = winston.createLogger({
            format: winston.format.json(),
            level: 'info',
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: `./logs/file.log`
                })
            ]
        });

    }

    public Info(message: string): void {

        this.logger.log('info', message);

    }

    public Debug(message: string) : void {

        this.logger.log('debug', message);

    }

    public Error(message: string): void {

        this.logger.log('error', message);
        
    }

}

export const LoggerInstance: Logger = new Logger();

