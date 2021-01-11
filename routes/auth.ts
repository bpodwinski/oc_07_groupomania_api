import * as express from "express";

// Controllers import
import AuthController from "../controllers/auth";

export default class UserRoute {
  public router = express.Router();
  public auth = new AuthController();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/auth/login", this.auth.userLogin);
    this.router.post("/auth/logout", this.auth.userLogout);
    this.router.post("/auth/register", this.auth.userRegister);
  }
}
