import * as express from "express";
import * as bodyParser from "body-parser";
import { MRecipeList } from "./models/MRecipeList";
import { MCustomer } from "./models/MCustomer";
import { MRecipe } from "./models/MRecipe";
import GooglePassportObj from "./GooglePassport";
import * as passport from "passport";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";

const crypto = require("crypto");
// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public expressApp: express.Application;
  public RecipeList: MRecipeList;
  public Customer: MCustomer;
  public Recipe: MRecipe;
  public googlePassportObj: GooglePassportObj;
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.RecipeList = new MRecipeList();
    this.Customer = new MCustomer();
    this.Recipe = new MRecipe();
    this.googlePassportObj = new GooglePassportObj();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger("dev"));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use(session({ secret: "waboot" }));
    this.expressApp.use(cookieParser());
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header("Access-Control-Allow-Methods", "*");
      next();
    });

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    router.get(
      "/auth/google",
      passport.authenticate("google", { scope: ["profile"] })
    );

    router.get(
      "/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/" }),
      (req: any, res: any) => {
        console.log(
          "successfully authenticated user and returned to callback page."
        );
        // var name = req.user.displayName;
        this.Customer.updateOrCreateCustomer(res, req.session.passport.user);
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

    router.get("/logout", (req: any, res: any) => {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/");
        }
      });
    });

    router.get("/recipe", (req, res) => {
      console.log("Query All Recipes");
      this.Recipe.retrieveAllRecipes(res);
    });
    router.get("/recipe/:recipeID", (req, res) => {
      var id = req.params.recipeID;
      console.log("Query a Recipe");
      this.Recipe.retrieveOneRecipe(res, id);
    });
    router.get("/recipelist", (req, res) => {
      console.log("Query All RecipeLists");
      this.RecipeList.retrieveAllRecipeLists(res);
    });

    router.get("/recipeList/:listID", (req, res) => {
      var id = req.params.listID;
      console.log("Query one list with list id: " + id);
      this.RecipeList.retrieveOneRecipeList(res, id);
    });
    //this.expressApp.use("/", router);

    router.get("/user", (req: any, res: any) => {
      if (req.user) {
        res.json({ id: req.user.id, displayName: req.user.displayName });
      }
    });

    router.get("/api/user/favorite", (req: any, res: any) => {
      if (req.user) {
        this.RecipeList.retrieveRecipeListFromUser(res, req.user.id);
      } else {
        res.sendStatus(401);
      }
    });

    router.get("/customer", (req, res) => {
      console.log("Query All customer");
      this.Customer.retrieveAllCustomers(res);
    });

    router.get("/customer/:userID", (req: any, res: any) => {
      var id = req.params.userID;
      console.log("Query customer with user id: " + id);
      this.Customer.retrieveOneCustomer(res, id);
    });
    router.post("/customer/recipeList", (req: any, res: any) => {
      console.log("sent:", req.body);
      var body = req.body;
      var userid = req.user.id;
      var listname = body.listName;
      var desc = body.description;
      var listid = crypto.randomBytes(16).toString("hex");
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${month}-${day}-${year}`;
      var jsonObj = {
        listID: listid,
        userID: userid,
        listName: listname,
        dateCreate: currentDate,
        description: desc,
      };
      this.RecipeList.model.create([jsonObj], (err) => {
        if (err) {
          console.log("Object creation failed");
        }
      });
      res.send(jsonObj);
    });
    router.post("/recipeList/recipe", (req: any, res: any) => {
      var jsonObj = req.body;
      this.RecipeList.model.create([jsonObj], (err) => {
        if (err) {
          console.log("Object creation failed");
        }
      });
      res.send({});
    });
    this.expressApp.use("/", router);
    this.expressApp.use("/", express.static(__dirname + "/dist/recipe-site"));
  }
}

export { App };
