// hint : try to use interface
export class UserModel {

    public userId:  string;
    public firstName : string;
    public lastName : string;
    public email :  string;
    public mobileNo : string;
    public username :  string;
    public password :  string;
    public status:  string;
    public address:  string;
    constructor() {

    }

    public castToUserModel(user: any): UserModel {
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
