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
    this.router.get("/user", this.auth, this.user.getUser);
    this.router.get("/user/:id", this.auth, this.user.getUserById);
    this.router.post("/user/:id", this.auth, this.user.updateUser);
    this.router.get("/user/:id/post", this.auth, this.user.getUserPostById);
  }
}
