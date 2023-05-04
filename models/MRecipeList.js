"use strict";
exports.__esModule = true;
exports.MRecipeList = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var MRecipeList = /** @class */ (function () {
    function MRecipeList() {
        this.createSchema();
        this.createModel();
    }
    //**************** */
    //refer doc on teams, and syntax is there
    MRecipeList.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            listID: String,
            userID: String,
            listName: String,
            dateCreate: String,
            description: String,
            recipes: (Array)
        }, {
            collection: "recipeListCollection",
            versionKey: false
        });
    };
    MRecipeList.prototype.createModel = function () {
        this.model = mongooseConnection.model("recipeList", this.schema);
    };
    MRecipeList.prototype.retrieveAllRecipeLists = function (response) {
        // var query = this.model.find({});//mongoose query
        var query = this.model.aggregate([
            {
                $lookup: {
                    from: "recipeCollection",
                    localField: "recipes",
                    foreignField: "recipeID",
                    as: "recipe_info"
                }
            },
        ]); //mongoose query
        //where query get exc
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    MRecipeList.prototype.retrieveOneRecipeList = function (response, filter) {
        // var query = this.model.find({ listID: filter });
        var query = this.model.aggregate([
            { $match: { listID: filter } },
            {
                $lookup: {
                    from: "recipeCollection",
                    localField: "recipes",
                    foreignField: "recipeID",
                    as: "recipe_info"
                }
            },
        ]); //mongoose query
        //where query get exc
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    MRecipeList.prototype.retrieveRecipeListFromUser = function (response, filter) {
        var query = this.model.aggregate([
            { $match: { userID: filter } },
            {
                $lookup: {
                    from: "recipeCollection",
                    localField: "recipes",
                    foreignField: "recipeID",
                    as: "recipe_info"
                }
            },
        ]); //mongoose query
        //where query get exc
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    return MRecipeList;
}());
exports.MRecipeList = MRecipeList;
