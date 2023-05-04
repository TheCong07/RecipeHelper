"use strict";
exports.__esModule = true;
exports.MRecipe = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var MRecipe = /** @class */ (function () {
    function MRecipe() {
        this.createSchema();
        this.createModel();
    }
    MRecipe.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            recipeID: String,
            image: String,
            name: String,
            ingredients: (Array),
            steps: (Array),
            source: String
        }, {
            collection: "recipeCollection",
            versionKey: false
        });
    };
    MRecipe.prototype.createModel = function () {
        this.model = mongooseConnection.model("recipe", this.schema);
    };
    MRecipe.prototype.retrieveAllRecipes = function (response) {
        var query = this.model.find({}); //mongoose query
        //where query get exc
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    MRecipe.prototype.retrieveOneRecipe = function (response, filter) {
        var query = this.model.find({ recipeID: filter });
        //where query get exc
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    return MRecipe;
}());
exports.MRecipe = MRecipe;
