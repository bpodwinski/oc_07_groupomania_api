import * as express from "express";
import * as cache from "cache-all/redis";

// Middleswares import
import AuthMiddleware from "../middlewares/authentification";
import * as PermitMiddleware from "../middlewares/permission";

// Controllers import
import PostController from "../controllers/post";

export default class PostRoute {
  public router: express.Router = express.Router();
  public post = new PostController();
  public auth = new AuthMiddleware().auth;
  public perm = PermitMiddleware.role;
  public cache = cache;

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/post/:page", this.auth, this.post.getPost);
    this.router.get("/post/:id/comment/", this.auth, this.post.getPostComment);
    this.router.delete(
      "/post/:id",
      this.auth,
      this.perm(["admin"]),
      this.post.deletePost
    );
    this.router.post("/post", this.auth, this.post.createPost);
  }
}
