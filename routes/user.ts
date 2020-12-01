import * as express from "express";

// Middleswares import
import AuthMiddleware from "../middlewares/auth";

// Controllers import
import UserController from "../controllers/user";

export default class UserRoute {
  public router = express.Router();
  public user = new UserController();
  public auth = new AuthMiddleware().auth;

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/user", this.auth, this.user.getUser);
    this.router.get("/user/:id", this.auth, this.user.getUserById);
    this.router.post("/user/:id", this.auth, this.user.updateUser);
  }
}
