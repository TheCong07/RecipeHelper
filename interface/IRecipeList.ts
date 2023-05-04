import Mongoose = require("mongoose");

interface IRecipeList extends Mongoose.Document {
    listID: string;
    userID: string;
    listName: string;
    dateCreate: string;
    description: string;
    recipes: Array<string>;
}
export {IRecipeList};