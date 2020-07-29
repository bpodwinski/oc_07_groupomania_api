import { Request, Response, NextFunction } from "express";

import Error from "../exceptions/app";

// Routes import
import Post from "../models/post";

export default class PostController {
  // Get all posts
  public async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const post: any = await Post.findAll();
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
        image: req.file.filename,
        userID: 1,
      });
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
}
