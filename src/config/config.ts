import {Logger} from "../util/Logger";
import * as dotenv from "dotenv";
dotenv.config();

export default class dotConfig {

    // jwt token secret
    private _SECRET_KEY : string;
    private static instance: dotConfig = null;

    public static getInstance(): dotConfig {
        if (dotConfig.instance === null) {
            dotConfig.instance = new dotConfig();
        }
        return dotConfig.instance;
    }
    constructor() {

      this._SECRET_KEY = process.env.AB_SECRET;
    }

    get SECRET_KEY(): string {
        return this.SECRET_KEY;
    }
}