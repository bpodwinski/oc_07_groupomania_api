import * as express from "express";
import * as cache from "cache-all/redis";

// Middleswares import
import AuthMiddleware from "../middlewares/auth";

// Controllers import
import UserController from "../controllers/user";

export default class UserRoute {
  public router = express.Router();
  public user = new UserController();
  public auth = new AuthMiddleware().auth;
  public cache = cache;

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(
      "/user",
      this.cache.middleware(10, "users"),
      this.auth,
      this.user.getUser
    );
    this.router.get(
      "/user/:id",
      this.cache.middleware(10, "user"),
      this.auth,
      this.user.getUserById
    );
    this.router.post("/user/:id", this.auth, this.user.updateUser);
  }
}
