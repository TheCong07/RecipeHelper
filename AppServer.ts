import {App} from  "./App"
const port = 8080;
let server: any = new App().expressApp;
server.listen(process.env.PORT || 8080);
console.log("Listening to port " + port);