import * as mongoose from "mongoose";
import {IUsers} from "../interfaces/IUsers";

export interface IUsersModel extends IUsers, mongoose.Document { }
const user = new mongoose.Schema({
    userId:  String,
    firstName : String,
    lastName : String,
    email : { type: String, unique: true },
    username : { type: String, unique: true },
    password : { type: String, unique: true },
    mobileNo : { type: String, unique: true },
    status: {type: String, default: 'Enable'},
    address:  String,
});

const User = mongoose.model<IUsersModel>("User", user);
export { User };