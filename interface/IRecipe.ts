import Mongoose = require("mongoose");

interface IRecipe extends Mongoose.Document {
    recipeID: string;
    image: string;
    name:string;
    ingredients:Array<string>;
    steps:Array<string>;
    source: string;
}
export {IRecipe};