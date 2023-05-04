import Mongoose = require("mongoose");

interface ICustomer extends Mongoose.Document {
    username: string;
    password: string;
    userID: string;
    name:string;
    email:string;
    allergy:Array<string>;
}
export {ICustomer};