import { Request, Response, NextFunction } from "express";

import Error from "../exceptions/app";

// Routes import
import Comment from "../models/comment";

export default class CommentController {
  // Get all comments
  public async getComment(req: Request, res: Response, next: NextFunction) {
    try {
      const comment: any = await Comment.findAll();
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }

  // Get all comments by user
  public async getCommentByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id: number = parseInt(req.params.id);
      const comment: any = await Comment.findAll({
        where: {
          userID: id,
        },
      });
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }

  // Get one comment by ID
  public async getCommentById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const comment: any = await Comment.findByPk(id);

      if (!comment) {
        throw new Error(404, "Not found");
      }

      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }

  // Create a comment
  public async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const comment: any = await Comment.create({
        postID: req.body.postID,
        userID: req.body.userID,
        text: req.body.text,
      });
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }

  // Delete a comment
  public async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const comment: any = await Comment.findByPk(id);

      if (!comment) {
        throw new Error(404, "Not found");
      }

      const deleteComment: any = await Comment.destroy({
        where: {
          id: id,
        },
      });
      res.status(204).json(deleteComment);
    } catch (error) {
      next(error);
    }
  }
}
