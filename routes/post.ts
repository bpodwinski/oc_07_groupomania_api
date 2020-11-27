import * as express from "express";

// Middleswares import
import AuthMiddleware from "../middlewares/auth";
import MulterMiddleware from "../middlewares/multer";

// Controllers import
import PostController from "../controllers/post";

export default class PostRoute {
  public router = express.Router();
  public post = new PostController();
  public auth = new AuthMiddleware().auth;
  public multer = MulterMiddleware;

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/post", this.auth, this.post.getPost);
    this.router.get("/post/:id", this.auth, this.post.getPostById);
    this.router.get("/post/user/:userID", this.auth, this.post.getPostByUser);
    this.router.delete("/post/:id", this.auth, this.post.deletePost);
    this.router.post("/post", this.auth, this.multer, this.post.createPost);
  }
}
