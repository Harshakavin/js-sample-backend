"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
class dotConfig {
    constructor() {
        this._SECRET_KEY = process.env.AB_SECRET;
    }
    static getInstance() {
        if (dotConfig.instance === null) {
            dotConfig.instance = new dotConfig();
        }
        return dotConfig.instance;
    }
    get SECRET_KEY() {
        return this._SECRET_KEY;
    }
}
exports.default = dotConfig;
dotConfig.instance = null;
