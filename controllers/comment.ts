import { Request, Response, NextFunction } from "express";
import db from "../prisma";
import Error from "../exceptions/app";

export default class CommentController {
  // Get one comment by ID
  public async getCommentById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const comment: any = await db.gpm_comment.findUnique({
        where: {
          id: id,
        },
      });

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
      const data: any = await db.gpm_comment.create({
        data: {
          content: req.body.content,
          gpm_post: req.body.postId,
          gpm_user: req.body.userId,
        },
      });

      const dataResult = await db.gpm_comment.findUnique({
        where: {
          id: data.id,
        },
        select: {
          postId: true,
          content: true,
          createdAt: true,
          updatedAt: true,
        },
        include: {
          gpm_user: true,
        },
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
      const comment: any = await db.gpm_comment.findUnique({
        where: {
          id: id,
        },
      });

      if (!comment) {
        throw new Error(404, "Not found");
      }

      const deleteComment: any = await db.gpm_comment.delete({
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
