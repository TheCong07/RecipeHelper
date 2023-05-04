import Mongoose = require("mongoose");
import { DataAccess } from "../DataAccess";
import { IRecipe } from "../interface/IRecipe";

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class MRecipe {
  public schema: any;
  public model: any;

  public constructor() {
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Mongoose.Schema(
      {
        recipeID: String,
        image: String,
        name: String,
        ingredients: Array<string>,
        steps: Array<string>,
        source: String,
      },
      {
        collection: "recipeCollection", //where it goes in database
        versionKey: false,
      }
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IRecipe>("recipe", this.schema);
  }

  public retrieveAllRecipes(response: any): any {
    var query = this.model.find({}); //mongoose query

    //where query get exc
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }
  public retrieveOneRecipe(response: any, filter: String): any {
    var query = this.model.find({ recipeID: filter });
    //where query get exc
    query.exec((err, itemArray) => {
      response.json(itemArray);
    });
  }
}
export { MRecipe };
