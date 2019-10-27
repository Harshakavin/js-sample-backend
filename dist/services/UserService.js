"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
const UserDao_1 = require("../db/dao/UserDao");
const Logger_1 = require("../util/Logger");
/**
  * @author 99x Technology
  * @description user services
  */
class UserService {
    constructor() {
        this.uuidv1 = require('uuidv1');
        this.logger = Logger_1.Logger.getInstance();
        this.config = config_1.default.getInstance();
        this.userDao = UserDao_1.UserDao.getInstance();
    }
    login(username, password) {
        return new Promise((resolve, reject) => {
            this.logger.info("Admin Creating An User... ");
            this.userDao.getUser({ username: username, password: password }).then(user => {
                jwt.sign({ user }, config_1.default.getInstance().SECRET_KEY, { algorithm: 'RS256' }, (err, token) => {
                    if (err)
                        reject(err);
                    resolve(token);
                });
            }).catch(error => {
                reject(error);
            });
        });
    }
    createNewUser(newUser) {
        return new Promise((resolve, reject) => {
            this.logger.info("Creating An User... ");
            resolve(null);
        });
    }
    forgetPassword(email) {
        return new Promise((resolve, reject) => {
            this.logger.info("forgetPassword... ");
            resolve(null);
        });
    }
    changePassword(user) {
        return new Promise((resolve, reject) => {
            this.logger.info("changePassword... ");
            resolve(null);
        });
    }
    checkEmail(email) {
        return new Promise((resolve, reject) => {
            this.logger.info("checkEmail... ");
            resolve(null);
        });
    }
}
exports.default = UserService;
