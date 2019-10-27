import {UserModel} from "../../models/UserModel";
import {IUsers} from "../interfaces/IUsers";
import { User } from "../schemas/userSchema";

 /**
   * @author 99x Technology
   * @description user DAO handle the add,update,delete,get functions
   */

export class UserDao {

    public static instance: UserDao = null;

    public static getInstance(): UserDao {
    if (UserDao.instance === null) {
       UserDao.instance = new UserDao();
    }
    return UserDao.instance;
    }

    public add(user: UserModel): Promise<any> {
        return new Promise(( resolve , reject) => {
            User.create(user).then((userobj: any) => {
                resolve(userobj);
            }).catch((err: any) => {
                if (err.code === 11000) {
                    reject("DUPLICATE: User already exist");
                } else {
                    reject(err.message.toString());
                }
            });
        });
    }

    public getUser(obj: object): Promise<any> {
        return new Promise((resolve, reject) => {
            User.findOne(obj).then((response: any) => {
                const user = (new UserModel()).castToUserModel(response);
                user.password = null;
                if (response !== null) {
                    resolve();
                } else {
                    resolve(null);
                }
            }).catch((err: Error) => {
                reject(err.message.toString());
            });
        });
    }


    public updateUser( condition: any, userData: object): Promise<any> {
        return new Promise((resolve, reject) => {
            User.update(condition, {$set: userData}, {multi: true})
                .then((response: any) => {
                    resolve(response);
                }).catch((err: Error) => {
                    reject(err.message.toString());
                });
        });
    }

    public deleteUser(condition: any): Promise<any> {
        return new Promise((resolve, reject) => {
            User.findOneAndRemove(condition)
                .then((respose: any) => {
                    resolve(respose);
                }).catch((err: Error) => {
                    reject(err.message.toString());
                });
        });
    }

}
