import { Request, Response, NextFunction } from "express";

import Error from "../exceptions/app";

// Models import
import Comment from "../models/comment";
import User from "../models/user";

export default class CommentController {
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
      const data: any = await Comment.create({
        userId: parseInt(req.body.userId),
        postId: parseInt(req.body.postId),
        content: req.body.content,
      });

      const dataResult = await Comment.findByPk(data.id, {
        attributes: ["postId", "content", "createdAt", "updatedAt"],
        include: [
          {
            model: User,
            attributes: [
              "id",
              "firstname",
              "lastname",
              "service",
              "email",
              "gravatar",
              "createdAt",
              "updatedAt",
            ],
          },
        ],
      });
      res.status(201).json(dataResult);
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
