import { Request, Response, NextFunction } from "express";

import Error from "../exceptions/app";

// Routes import
import Post from "../models/post";

export default class PostController {
  // Get all posts
  public async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const post: any = await Post.findAll();
      console.log(JSON.parse(JSON.stringify(post)));
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
