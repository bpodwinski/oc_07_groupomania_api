import * as express from "express";

// Middlewares import
import MulterMiddleware from "../middlewares/multer";

// Controllers import
import UserController from "../controllers/user";

export default class UserRoute {
  public router = express.Router();
  public user = new UserController();
  public multer = MulterMiddleware;

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/auth/login", this.user.userLogin);
    this.router.post("/auth/logout", this.user.userLogout);
    this.router.post("/auth/register", this.multer, this.user.userRegister);
  }
}
