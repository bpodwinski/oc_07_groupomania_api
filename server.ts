import conf from "./utils/config";
import App from "./app";
import * as bodyParser from "body-parser";

// Middlewares import
import CorsMiddleware from "./middlewares/cors";

// Routes import
import AuthRoute from "./routes/auth";
import UserRoute from "./routes/user";
import PostRoute from "./routes/post";

const app: any = new App({
  host: conf.HOST,
  port: conf.PORT,
  db_name: conf.DB_NAME,
  db_host: conf.DB_HOST,
  db_user: conf.DB_USER,
  db_pass: conf.DB_PASS,
  middlewares: [
    new CorsMiddleware().cors,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
  ],
  routes: [new AuthRoute(), new UserRoute(), new PostRoute()],
});

app.listen();
