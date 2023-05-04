"use strict";
exports.__esModule = true;
var App_1 = require("./App");
var port = 8080;
var server = new App_1.App().expressApp;
server.listen(process.env.PORT || 8080);
console.log("Listening to port " + port);
