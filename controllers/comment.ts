import { Request, Response, NextFunction } from "express";
import db from "../prisma";
import Error from "../exceptions/app";

export default class CommentController {
  // Get one comment by ID
  public async getCommentById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const getComment = await db.comment.findUnique({
        where: {
          id: id,
        },
      });

      if (!getComment) {
        throw new Error(404, "Not found");
      }

      res.status(200).json(getComment);
    } catch (error) {
      next(error);
    }
  }

  // Create a comment
  public async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const createComment = await db.comment.create({
        data: {
          user: {
            connect: {
              id: parseInt(req.body.userId),
            },
          },
          post: {
            connect: {
              id: parseInt(req.body.postId),
            },
          },
          content: req.body.content,
        },
        select: {
          postId: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              service: true,
              email: true,
              gravatar: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });
      res.status(201).json(createComment);
    } catch (error) {
      next(error);
    }
  }

  // Delete a comment
  public async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const getComment = await db.comment.findUnique({
        where: {
          id: id,
        },
      });

      if (!getComment) {
        throw new Error(404, "Not found");
      }

      const deleteComment: any = await db.comment.delete({
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
