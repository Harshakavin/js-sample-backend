"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston = require("winston");
var splat = winston_1.format.splat;
var simple = winston_1.format.simple;
const { combine, timestamp, label, printf } = winston_1.format;
/**
 * This class wraps winston functionality.
 * Basic logging functions are exposed.
 * Winston instance can be accessed by logger
 * TODO: Add more transports for logging into files
 */
class Logger {
    constructor() {
        this.transports = {
            all: new winston.transports.File({
                filename: "./logs/all.log",
                format: combine(timestamp(), splat(), simple(), winston_1.format.json()),
                level: "debug",
            }),
            console: new winston.transports.Console({
                format: combine(splat(), simple()),
                level: "silly",
            }),
        };
        this.logger = winston.createLogger({
            levels: {
                debug: 3,
                error: 0,
                info: 1,
                performance: 4,
                silly: 5,
                warn: 2,
            },
            transports: [
                this.transports.console,
                this.transports.all,
            ],
        });
        this.logger.log("info", "We can Log :)");
    }
    static getInstance() {
        if (Logger.instance === null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    /**
     * log
     */
    log(msg) {
        this.logger.info(msg);
    }
    /**
     * error
     */
    error(msg) {
        this.logger.log("error", msg);
    }
    /**
     * warn
     */
    warn(msg) {
        this.logger.log("warn", msg);
    }
    /**
     * info
     */
    info(msg) {
        this.logger.info(msg);
    }
    /**
     * verbose
     */
    verbose(msg) {
        this.logger.log("verbose", msg);
    }
    /**
     * debug
     */
    debug(msg) {
        this.logger.log("debug", msg);
    }
    /**
     * silly
     */
    silly(msg) {
        this.logger.log("silly", msg);
    }
}
exports.Logger = Logger;
Logger.instance = null;
