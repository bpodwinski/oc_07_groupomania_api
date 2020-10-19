import * as express from "express";

// Middleswares import
import Auth from "../middlewares/auth";

// Controllers import
import UserController from "../controllers/user";

export default class UserRoute {
  public router = express.Router();
  public user = new UserController();
  public auth = new Auth().auth;

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/user", this.user.getUser);
    this.router.get("/user/:id", this.user.getUserById);
    this.router.get("/user/:id/post", this.user.getUserPostById);
  }
}
