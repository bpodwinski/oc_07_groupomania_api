import { Request, Response, NextFunction } from "express";
import Error from "../exceptions/app";
import db from "../prisma";

export default class PostController {
  // Get posts
  public async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const page: number = parseInt(req.params.page);
      const pageSize: number = 5;

      const data = await db.post.findMany({
        take: pageSize,
        //skip: page * pageSize,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        select: {
          id: true,
          title: true,
          content: true,
          imgUrl: true,
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

      const dataResult: object = {
        page: page,
        pageSize: pageSize,
        posts: data,
      };

      return res.status(200).json(dataResult);
    } catch (error) {
      next(error);
    }
  }

  // Get post comments
  public async getPostComment(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const data = await db.comment.findMany({
        where: {
          postId: id,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        select: {
          id: true,
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

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // Create a post
  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.file !== undefined) {
        const data = await db.post.create({
          data: {
            user: {
              connect: {
                id: parseInt(req.body.userId),
              },
            },
            title: req.body.title,
            content: req.body.content,
            imgUrl: "/uploads/" + req.file.filename,
          },
          select: {
            id: true,
            title: true,
            content: true,
            imgUrl: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                firstname: true,
                lastname: true,
                createdAt: true,
                updatedAt: true,
                comment: {
                  select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                      select: {
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
                },
              },
            },
          },
        });

        res.status(201).json(data);
      } else {
        const data = await db.post.create({
          data: {
            user: {
              connect: {
                id: parseInt(req.body.userId),
              },
            },
            title: req.body.title,
            content: req.body.content,
          },
          select: {
            id: true,
            title: true,
            content: true,
            imgUrl: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                firstname: true,
                lastname: true,
                createdAt: true,
                updatedAt: true,
                comment: {
                  select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                    user: {
                      select: {
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
                },
              },
            },
          },
        });

        res.status(201).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  // Delete a post
  public async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const post = await db.post.findUnique({
        where: {
          id: id,
        },
      });

      if (!post) {
        throw new Error(404, "Not found");
      }

      const deletePost = await db.post.delete({
        where: {
          id: id,
        },
      });

      res.status(204).json(deletePost);
    } catch (error) {
      next(error);
    }
  }
}
