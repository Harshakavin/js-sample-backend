"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("../config/config");
const CourseCtrl_1 = require("../controllers/CourseCtrl");
const UsersCtrl_1 = require("../controllers/UsersCtrl");
const Auth_1 = require("../middleware/Auth");
const Logger_1 = require("../util/Logger");
function setRoutes(app) {
    const router = express.Router();
    const routeOut = express.Router();
    const logger = new Logger_1.Logger();
    const courseCtrl = new CourseCtrl_1.CourseCtrl();
    const userCtrl = new UsersCtrl_1.UserCtrl();
    const Config = new config_1.default();
    // auth
    const authMiddleware = Auth_1.auth({ secret: Config.SECRET_KEY });
    // core routes
    app.use("/api", authMiddleware, router);
    app.use("/api", routeOut);
    //  user
    router.route("/user").post(userCtrl.addUser);
    routeOut.route("/login").get(userCtrl.login);
    router.route("/check/username/:username").get(userCtrl.checkUserName);
    router.route("/checkuserphone/:phone").get(userCtrl.checkMobile);
    // course 
    router.route("/course").post(courseCtrl.addCourse);
    router.route("/courses").get(courseCtrl.getCourses);
    //router.route("/courses/:coursesId").get(courseCtrl.); etc..
}
exports.default = setRoutes;
