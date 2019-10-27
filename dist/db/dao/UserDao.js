"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../../models/UserModel");
const userSchema_1 = require("../schemas/userSchema");
/**
  * @author 99x Technology
  * @description user DAO handle the add,update,delete,get functions
  */
class UserDao {
    static getInstance() {
        if (UserDao.instance === null) {
            UserDao.instance = new UserDao();
        }
        return UserDao.instance;
    }
    add(user) {
        return new Promise((resolve, reject) => {
            userSchema_1.User.create(user).then((userobj) => {
                resolve(userobj);
            }).catch((err) => {
                if (err.code === 11000) {
                    reject("DUPLICATE: User already exist");
                }
                else {
                    reject(err.message.toString());
                }
            });
        });
    }
    getUser(obj) {
        return new Promise((resolve, reject) => {
            userSchema_1.User.findOne(obj).then((response) => {
                const user = (new UserModel_1.UserModel()).castToUserModel(response);
                user.password = null;
                if (response !== null) {
                    resolve();
                }
                else {
                    resolve(null);
                }
            }).catch((err) => {
                reject(err.message.toString());
            });
        });
    }
    updateUser(condition, userData) {
        return new Promise((resolve, reject) => {
            userSchema_1.User.update(condition, { $set: userData }, { multi: true })
                .then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err.message.toString());
            });
        });
    }
    deleteUser(condition) {
        return new Promise((resolve, reject) => {
            userSchema_1.User.findOneAndRemove(condition)
                .then((respose) => {
                resolve(respose);
            }).catch((err) => {
                reject(err.message.toString());
            });
        });
    }
}
exports.UserDao = UserDao;
UserDao.instance = null;
