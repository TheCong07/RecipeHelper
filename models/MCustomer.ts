import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import { ICustomer } from "../interface/ICustomer";
import session = require("express-session");

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class MCustomer {
  // createCustomerFromGoogleUser(user: Express.User, arg1: (err: any, customer: any) => void) {
  //   throw new Error("Method not implemented.");
  // }
  // findOne(arg0: { googleId: any; }) {
  //   throw new Error("Method not implemented.");
  // }
  public schema: any;
  public model: any;

  public constructor() {
    this.createSchema();
    this.createModel();
  }

  //**************** */
  //refer doc on teams, and syntax is there
  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        username: String,
        password: String,
        userID: String,
        name: String,
        email: String,
        allergy: Array<string>(),
      },
      {
        collection: "customerCollection", //where it goes in database
        versionKey: false,
      }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<ICustomer>("customer", this.schema);
  }

  public updateOrCreateCustomer(response: any, user: any): any {
    var query = this.model.updateOne(
      { userID: user.id },
      { $set: { name: user.displayName } },
      { upsert: true }
    );

    query.exec((err) => {
      console.log(err);
    });
  }

  public retrieveAllCustomers(response: any): any {
    var query = this.model.find({}); //mongoose query

    //where query get exc
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }
  public retrieveOneCustomer(response: any, filter: String): any {
    var query = this.model.find({ userID: filter });
    //where query get exc
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }
}
export { MCustomer };
