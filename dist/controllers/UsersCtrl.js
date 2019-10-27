"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
class UserCtrl {
    constructor() {
        this.addUser = (req, res) => {
            try {
                const user = req.body.user;
                this.userService.createNewUser(user)
                    .then((username) => {
                    this.logger.info("User creation complete");
                    return res.status(200).json({ message: "User signUp complete" });
                }).catch((err) => {
                    this.logger.error("Oh something went wrong" + err);
                    return res.status(403).json("User creation cannot be completed");
                });
            }
            catch (err) {
                this.logger.error(err);
                return res.status(417).json("Request failed !");
            }
        };
        this.login = (req, res) => {
            try {
                const user = req.body.user;
                this.userService.login(user.username, user.password)
                    .then((token) => {
                    return res.status(200).json({ message: "User login complete", IDtoken: token });
                }).catch((error) => {
                    this.logger.error(error);
                    return res.status(401).json("User name or password incorrect");
                });
            }
            catch (error) {
                this.logger.error(error);
                return res.status(400).json({ error: "Login failed !" });
            }
        };
        this.checkMobile = (req, res) => {
            return res.status(400).json({ message: "Not implemented" });
        };
        this.checkUserName = (req, res) => {
            return res.status(400).json({ message: "Not implemented" });
        };
        this.userService = new UserService_1.default();
    }
}
exports.UserCtrl = UserCtrl;
