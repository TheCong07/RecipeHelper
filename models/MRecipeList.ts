import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import { IRecipeList } from "../interface/IRecipeList";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class MRecipeList {
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
        listID: String,
        userID: String,
        listName: String,
        dateCreate: String,
        description: String,
        recipes: Array<string>,
      },
      {
        collection: "recipeListCollection", //where it goes in database
        versionKey: false,
      }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IRecipeList>(
      "recipeList",
      this.schema
    );
  }

  public retrieveAllRecipeLists(response: any): any {
    // var query = this.model.find({});//mongoose query
    var query = this.model.aggregate([
      {
        $lookup: {
          from: "recipeCollection",
          localField: "recipes",
          foreignField: "recipeID",
          as: "recipe_info",
        },
      },
    ]); //mongoose query
    //where query get exc
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }
  public retrieveOneRecipeList(response: any, filter: String): any {
    // var query = this.model.find({ listID: filter });
    var query = this.model.aggregate([
      { $match: { listID: filter } },
      {
        $lookup: {
          from: "recipeCollection",
          localField: "recipes",
          foreignField: "recipeID",
          as: "recipe_info",
        },
      },
    ]); //mongoose query
    //where query get exc
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }

  public retrieveRecipeListFromUser(response: any, filter: string): any {
    var query = this.model.aggregate([
      { $match: { userID: filter } },
      {
        $lookup: {
          from: "recipeCollection",
          localField: "recipes",
          foreignField: "recipeID",
          as: "recipe_info",
        },
      },
    ]); //mongoose query
    //where query get exc
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }
}
export { MRecipeList };
