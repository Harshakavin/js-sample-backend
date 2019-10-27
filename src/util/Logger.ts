import { format } from "winston";
import * as winston from "winston";
import splat = format.splat;
import simple = format.simple;
const  { combine, timestamp, label, printf } = format;

/**
 * This class wraps winston functionality.
 * Basic logging functions are exposed.
 * Winston instance can be accessed by logger
 * TODO: Add more transports for logging into files
 */

export class Logger {
    public static getInstance(): Logger {
        if (Logger.instance === null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    private static instance: Logger = null;
    public logger: any;
    public accessLog: any;
    public performaceLog: any;
    public transports: any = {
             all: new winston.transports.File({
                    filename: "./logs/all.log",
                    format: combine(
                        timestamp(),
                        splat(),
                        simple(),
                        format.json()),
                        level: "debug",
                    }),

             console: new winston.transports.Console({
                      format: combine(
                      splat(),
                      simple()),
                      level: "silly",
                      }),
    };

    constructor() {
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

  /**
   * log
   */
  public log(msg: string) {
    this.logger.info(msg);
  }

  /**
   * error
   */
  public error(msg: string) {
    this.logger.log("error", msg);
  }

  /**
   * warn
   */
  public warn(msg: string) {
    this.logger.log("warn", msg);
  }

  /**
   * info
   */
  public info(msg: string) {
    this.logger.info(msg);
  }

  /**
   * verbose
   */
  public verbose(msg: string) {
    this.logger.log("verbose",msg);
  }

  /**
   * debug
   */
  public debug(msg: string) {
    this.logger.log("debug", msg);
  }

  /**
   * silly
   */
  public silly(msg: string) {
    this.logger.log("silly", msg);
  }

}
