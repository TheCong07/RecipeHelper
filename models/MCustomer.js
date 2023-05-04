"use strict";
exports.__esModule = true;
exports.MCustomer = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var MCustomer = /** @class */ (function () {
    function MCustomer() {
        this.createSchema();
        this.createModel();
    }
    //**************** */
    //refer doc on teams, and syntax is there
    MCustomer.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            username: String,
            password: String,
            userID: String,
            name: String,
            email: String,
            allergy: Array()
        }, {
            collection: "customerCollection",
            versionKey: false
        });
    };
    MCustomer.prototype.createModel = function () {
        this.model = mongooseConnection.model("customer", this.schema);
    };
    MCustomer.prototype.updateOrCreateCustomer = function (response, user) {
        var query = this.model.updateOne({ userID: user.id }, { $set: { name: user.displayName } }, { upsert: true });
        query.exec(function (err) {
            console.log(err);
        });
    };
    MCustomer.prototype.retrieveAllCustomers = function (response) {
        var query = this.model.find({}); //mongoose query
        //where query get exc
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    MCustomer.prototype.retrieveOneCustomer = function (response, filter) {
        var query = this.model.find({ userID: filter });
        //where query get exc
        query.exec(function (err, itemArray) {
            response.json(itemArray);
        });
    };
    return MCustomer;
}());
exports.MCustomer = MCustomer;
