import { Logger } from "../util/Logger";
import UserService from "../services/UserService";

export class UserCtrl {

    public userService : UserService;
    public logger: Logger;
    constructor() {
        this.userService = new UserService();
    }

    public addUser = (req: any, res: any) => {
        try {
            const user = req.body.user;
            this.userService.createNewUser(user)
            .then((username: any) => {
                 this.logger.info("User creation complete");                           
                 return res.status(200).json({message: "User signUp complete"});
             }).catch((err: any) => {
                this.logger.error("Oh something went wrong" + err);            
                return res.status(403).json("User creation cannot be completed");          
             });
        } catch (err) {
            this.logger.error(err);
            return res.status(417).json("Request failed !");
        }
    }

    public login = (req: any, res: any) => {
        try {
            const user = req.body.user;
            this.userService.login(user.username, user.password)
            .then((token: any) => {                 
                 return res.status(200).json({message: "User login complete",IDtoken : token});
             }).catch((error: any) => {
                this.logger.error(error);            
                return res.status(401).json("User name or password incorrect");          
             });
        } catch (error) {
            this.logger.error(error);
            return res.status(400).json({error:"Login failed !"});
        }
    }

    public checkMobile = (req: any, res: any) => {
        return res.status(400).json({message : "Not implemented"});               
    }

    public checkUserName = (req: any, res: any) => {
        return res.status(400).json({message : "Not implemented"});         
    }

}
