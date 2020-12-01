import { Request, Response, NextFunction } from "express";
import * as cache from "cache-all/redis";
import { env } from "../utils/env";

import Error from "../exceptions/app";

// Models import
import Post from "../models/post";
import User from "../models/user";
import Comment from "../models/comment";

export default class PostController {
  // Get all posts
  public async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const dataCached: Promise<any> = await cache.get("posts_all");

      if (dataCached === null) {
        const data = await Post.findAll({
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
        cache.set("posts_all", data, env.CACHE_TTL);
        return res.status(200).json(data);
      }

      res.status(200).json(dataCached);
    } catch (error) {
      next(error);
    }
  }

  // Get all posts by user
  public async getPostByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const dataCached: Promise<any> = await cache.get("post_user_" + id);

      if (dataCached === null) {
        const data = await Post.findAll({
          where: {
            userID: id,
          },
        });
        cache.set("postuser_" + id, data, env.CACHE_TTL);
        return res.status(200).json(data);
      }

      res.status(200).json(dataCached);
    } catch (error) {
      next(error);
    }
  }

  // Get one post by ID
  public async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const dataCached: Promise<any> = await cache.get("post_" + id);

      if (dataCached === null) {
        const data = await Post.findByPk(id);

        if (!data) {
          throw new Error(404, "Not found");
        }

        cache.set("post_" + id, data, env.CACHE_TTL);
        return res.status(200).json(data);
      }

      return res.status(200).json(dataCached);
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

      // Refresh the cache
      cache.removeByPattern("posts_all");

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

      // Refresh the cache
      cache.removeByPattern("posts_all");

      res.status(204).json(deletePost);
    } catch (error) {
      next(error);
    }
  }
}
