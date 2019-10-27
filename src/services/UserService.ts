import * as jwt from 'jsonwebtoken';
import DotConfig from "../config/config";
import {UserDao} from "../db/dao/UserDao";
import {UserModel} from "../models/UserModel";
import {Logger} from "../util/Logger";

 /**
   * @author 99x Technology
   * @description user services
   */

export default class UserService {

    public uuidv1 = require('uuidv1');
    public logger: Logger;
    public userDao: UserDao;
    public config: DotConfig;

    constructor() {
       this.logger = Logger.getInstance();
       this.config = DotConfig.getInstance();
       this.userDao = UserDao.getInstance();
    }

    public login(username: string,password: string): Promise<any> {
       return new Promise((resolve, reject) => {
             this.logger.info("Admin Creating An User... ");
             this.userDao.getUser({username:username, password: password}).then(user =>{
                jwt.sign({ user }, DotConfig.getInstance().SECRET_KEY, { algorithm: 'RS256' }, 
                (err:any, token:any) => {
                    if(err) reject(err);
                    resolve(token)
                 });    
             }).catch(error =>{
                  reject(error);
             }); 
        });
    }

    public createNewUser(newUser: UserModel): Promise<any> {
         return new Promise((resolve, reject) => {
             this.logger.info("Creating An User... "); 
             resolve(null)         
         });
    }

    public forgetPassword(email: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.logger.info("forgetPassword... "); 
            resolve(null)         
        });
    }

    public changePassword(user: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.logger.info("changePassword... "); 
            resolve(null)         
        });
    }


    public checkEmail(email: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.logger.info("checkEmail... "); 
            resolve(null)         
        });
    }
}

 
