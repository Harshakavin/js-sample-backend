"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// hint : try to use interface
class UserModel {
    constructor() {
    }
    castToUserModel(user) {
        const userModel = new UserModel();
        userModel.firstName = user.firstName;
        userModel.lastName = user.lastName;
        userModel.email = user.email;
        userModel.mobileNo = user.mobileNo;
        userModel.username = user.username;
        userModel.password = user.password;
        userModel.status = user.status;
        userModel.userId = user.userId;
        return userModel;
    }
}
exports.UserModel = UserModel;
