import { env } from "./utils/env";
import App from "./app";
import * as bodyParser from "body-parser";

// Middlewares import
import CorsMiddleware from "./middlewares/cors";

// Routes import
import AuthRoute from "./routes/auth";
import UserRoute from "./routes/user";
import PostRoute from "./routes/post";
import CommentRoute from "./routes/comment";

const app: any = new App({
  host: env.HOST,
  port: env.PORT,
  db_name: env.DB_NAME,
  db_host: env.DB_HOST,
  db_user: env.DB_USER,
  db_pass: env.DB_PASS,
  middlewares: [
    new CorsMiddleware().cors,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
  ],
  routes: [
    new AuthRoute(),
    new UserRoute(),
    new PostRoute(),
    new CommentRoute(),
  ],
});

app.listen();
