"use strict";
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var MRecipeList_1 = require("./models/MRecipeList");
var MCustomer_1 = require("./models/MCustomer");
var MRecipe_1 = require("./models/MRecipe");
var GooglePassport_1 = require("./GooglePassport");
var passport = require("passport");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var crypto = require("crypto");
// Creates and configures an ExpressJS web server.
var App = /** @class */ (function () {
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.RecipeList = new MRecipeList_1.MRecipeList();
        this.Customer = new MCustomer_1.MCustomer();
        this.Recipe = new MRecipe_1.MRecipe();
        this.googlePassportObj = new GooglePassport_1["default"]();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.expressApp.use(logger("dev"));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(session({ secret: "waboot" }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "*");
            next();
        });
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            done(null, user);
        });
        router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));
        router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), function (req, res) {
            console.log("successfully authenticated user and returned to callback page.");
            // var name = req.user.displayName;
            _this.Customer.updateOrCreateCustomer(res, req.session.passport.user);
            res.redirect("/");
        }
        // function(req:any, res:any) {
        //   // Create a new customer using the Google user's information
        //   var newCustomer = new MCustomer();
        //   newCustomer.createCustomerFromGoogleUser(req.user, function(err, customer) {
        //     if (err) {
        //       console.error(err);
        //       return res.redirect('/');
        //     }
        //     // Redirect to the home page with the customer's name in the URL
        //     res.redirect('/#/home?name=' + customer.name);
        //   });
        // }
        );
        router.get("/logout", function (req, res) {
            req.session.destroy(function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.redirect("/");
                }
            });
        });
        router.get("/recipe", function (req, res) {
            console.log("Query All Recipes");
            _this.Recipe.retrieveAllRecipes(res);
        });
        router.get("/recipe/:recipeID", function (req, res) {
            var id = req.params.recipeID;
            console.log("Query a Recipe");
            _this.Recipe.retrieveOneRecipe(res, id);
        });
        router.get("/recipelist", function (req, res) {
            console.log("Query All RecipeLists");
            _this.RecipeList.retrieveAllRecipeLists(res);
        });
        router.get("/recipeList/:listID", function (req, res) {
            var id = req.params.listID;
            console.log("Query one list with list id: " + id);
            _this.RecipeList.retrieveOneRecipeList(res, id);
        });
        //this.expressApp.use("/", router);
        router.get("/user", function (req, res) {
            if (req.user) {
                res.json({ id: req.user.id, displayName: req.user.displayName });
            }
        });
        router.get("/api/user/favorite", function (req, res) {
            if (req.user) {
                _this.RecipeList.retrieveRecipeListFromUser(res, req.user.id);
            }
            else {
                res.sendStatus(401);
            }
        });
        router.get("/customer", function (req, res) {
            console.log("Query All customer");
            _this.Customer.retrieveAllCustomers(res);
        });
        router.get("/customer/:userID", function (req, res) {
            var id = req.params.userID;
            console.log("Query customer with user id: " + id);
            _this.Customer.retrieveOneCustomer(res, id);
        });
        router.post("/customer/recipeList", function (req, res) {
            console.log("sent:", req.body);
            var body = req.body;
            var userid = req.user.id;
            var listname = body.listName;
            var desc = body.description;
            var listid = crypto.randomBytes(16).toString("hex");
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var currentDate = "".concat(month, "-").concat(day, "-").concat(year);
            var jsonObj = {
                listID: listid,
                userID: userid,
                listName: listname,
                dateCreate: currentDate,
                description: desc
            };
            _this.RecipeList.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("Object creation failed");
                }
            });
            res.send(jsonObj);
        });
        router.post("/recipeList/recipe", function (req, res) {
            var jsonObj = req.body;
            _this.RecipeList.model.create([jsonObj], function (err) {
                if (err) {
                    console.log("Object creation failed");
                }
            });
            res.send({});
        });
        this.expressApp.use("/", router);
        this.expressApp.use("/", express.static(__dirname + "/dist/recipe-site"));
    };
    return App;
}());
exports.App = App;
