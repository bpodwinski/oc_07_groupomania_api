import * as express from "express";

// Middleswares import
import AuthMiddleware from "../middlewares/auth";
import MulterMiddleware from "../middlewares/multer";

// Controllers import
import CommentController from "../controllers/comment";

export default class PostRoute {
  public router = express.Router();
  public comment = new CommentController();
  public auth = new AuthMiddleware().auth;
  public multer = MulterMiddleware;

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/comment/:id", this.auth, this.comment.getCommentById);
    this.router.get(
      "/comment/user/:id",
      this.auth,
      this.comment.getCommentByUser
    );
    this.router.delete("/comment/:id", this.auth, this.comment.deleteComment);
    this.router.post(
      "/comment",
      this.auth,
      this.multer,
      this.comment.createComment
    );
  }
}
