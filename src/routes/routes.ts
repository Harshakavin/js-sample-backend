import * as express from "express";
import dotConfig from "../config/config";
import { CourseController} from "../controllers/CourseCtrl";
import { UserCtrl } from "../controllers/UsersCtrl";
import { auth, IRequest } from "../middleware/Auth";
import { Logger } from "../util/Logger";

export default function setRoutes(app: any) {

    const router = express.Router();
    const routeOut = express.Router();
    const logger = new Logger();

    const courseCtrl = new CourseController();
    const userCtrl = new UserCtrl();
    const Config = new dotConfig();



    // auth
    const authMiddleware = auth({ secret: Config.SECRET_KEY });


    // core routes
    app.use("/api", authMiddleware, router);
    app.use("/api",routeOut);

    //  user
    router.route("/user").post(userCtrl.addUser);
    routeOut.route("/login").get(userCtrl.login);
    router.route("/check/username/:username").get(userCtrl.checkUserName);
    router.route("/checkuserphone/:phone").get(userCtrl.checkMobile);

    // course 
    router.route("/course").post(courseCtrl.addCourse);
    router.route("/courses").get(courseCtrl.addCourse);
    //router.route("/courses/:coursesId").get(courseCtrl.); etc..

    }
