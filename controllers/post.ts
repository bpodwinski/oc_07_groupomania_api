import { Request, Response, NextFunction } from "express";
import { Model } from "sequelize/types";

import Error from "../exceptions/app";

// Models import
import Post from "../models/post";
import User from "../models/user";
import Comment from "../models/comment";

export default class PostController {
  // Get all posts
  public async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const post: any = await Post.findAll({
        include: [
          {
            model: User,
            attributes: [
              "id",
              "firstname",
              "lastname",
              "createdAt",
              "updatedAt",
            ],
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: [
                  "id",
                  "firstname",
                  "lastname",
                  "createdAt",
                  "updatedAt",
                ],
              },
            ],
          },
        ],
      });
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  // Get all posts by user
  public async getPostByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const post: any = await Post.findAll({
        where: {
          userID: id,
        },
      });
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  // Get one post by ID
  public async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const post: any = await Post.findByPk(id);

      if (!post) {
        throw new Error(404, "Not found");
      }

      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  // Create a post
  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const post: any = await Post.create({
        title: req.body.title,
        description: req.body.description,
        text: req.body.text,
        //image: req.file.filename,
        userID: req.body.userID,
      });
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }

  // Delete a post
  public async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const post: any = await Post.findByPk(id);

      if (!post) {
        throw new Error(404, "Not found");
      }

      const deletePost: any = await Post.destroy({
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
