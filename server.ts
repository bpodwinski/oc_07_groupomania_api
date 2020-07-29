import * as config from "./config/config";
import App from "./app";
import * as bodyParser from "body-parser";

// Middlewares import
//import MulterMiddleware from "./middlewares/multer";
import CorsMiddleware from "./middlewares/cors";

// Routes import
import AuthRoute from "./routes/auth";
import UserRoute from "./routes/user";
import PostRoute from "./routes/post";

const app: any = new App({
  host: config.HOST,
  port: config.PORT,
  middlewares: [
    new CorsMiddleware().cors,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    //new MulterMiddleware().multer.single("img"),
  ],
  routes: [new AuthRoute(), new UserRoute(), new PostRoute()],
});

app.listen();
