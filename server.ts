import { env } from "./utils/env";
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
  host: env.HOST,
  port: env.PORT,
  db_name: env.DB_NAME,
  db_host: env.DB_HOST,
  db_user: env.DB_USER,
  db_pass: env.DB_PASS,
  redis_db: env.REDIS_DB,
  redis_port: env.REDIS_PORT,
  redis_host: env.REDIS_HOST,
  redis_pass: env.REDIS_PASS,
  redis_prefix: env.REDIS_PREFIX,
  cache_ttl: env.CACHE_TTL,
  cache_enable: env.CACHE_ENABLE,
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
