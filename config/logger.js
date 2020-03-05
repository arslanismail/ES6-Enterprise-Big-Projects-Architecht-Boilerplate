
import winston from 'winston';
import fs from 'fs';
import path from 'path';
const DailyRotateFile = require('winston-daily-rotate-file');

class Logger {
    
    constructor() {
        this.logger = undefined;
        // this._errorLogger = undefined;
    }

    static get logDirectory() {
        return path.join(process.cwd(), 'logs');
    }

    static CreateLogFolderIfNotExists() {
        // ensure log directory exists
        if (!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory);
        }
    }

    static SetLogger(app) {
        if(!this.logger) {
            this.logger = new winston.createLogger({
                transports: [
                    new DailyRotateFile({
                        filename: path.join(Logger.logDirectory, "%DATE%.log"),
                        datePattern: 'YYYY-MM-DD',
                        prepend: true,
                        localTime: true,
                        level: 'verbose'
                    })
                ],
                exitOnError: false
            });
        }
    }

    static configureLogger(app) {
        this.CreateLogFolderIfNotExists();
        this.SetLogger(app);
    }


    static GetValue(value) {
        if (typeof value === "string") {
            return value;
        } else {
            return JSON.stringify(value);
        }
    }

    static debug(value) {
        if (this.logger) {
            this.logger.log('debug', this.GetValue(value));
        } else {
            console.log(this.GetValue(value));
        }
    }

    static error(value) {
        if (this.logger) {
            this.logger.log('error', this.GetValue(value));
        } else {
            console.log(this.GetValue(value));
        }
    }

    static warn(value) {
        if (this.logger) {
            this.logger.log('warn', this.GetValue(value));
        } else {
            console.log(this.GetValue(value));
        }
    }

    static info(value) {
        if (this.logger) {
            this.logger.log('info', this.GetValue(value));
        } else {
            console.log(this.GetValue(value));
        }
    }
}
export default Logger;