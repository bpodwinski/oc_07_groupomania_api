import App from "./app";
import * as bodyParser from "body-parser";

// Middlewares import
import CorsMiddleware from "./middlewares/cors";
import MulterMiddleware from "./middlewares/multer";

// Routes import
import AuthRoute from "./routes/auth";
import UserRoute from "./routes/user";
import PostRoute from "./routes/post";
import CommentRoute from "./routes/comment";

const app: any = new App({
  host: process.env.HOST || "localhost",
  port: process.env.PORT || "3000",
  middlewares: [
    new CorsMiddleware().cors,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    new MulterMiddleware().multer.single("image"),
  ],
  routes: [
    new AuthRoute(),
    new UserRoute(),
    new PostRoute(),
    new CommentRoute(),
  ],
});

app.listen();
