import { Request, Response, NextFunction } from "express";
import * as cache from "cache-all/redis";
import { env } from "../utils/env";
const { Op } = require("sequelize");
import Error from "../exceptions/app";

// Models import
import Post from "../models/post";
import User from "../models/user";
import Comment from "../models/comment";

export default class PostController {
  // Get posts
  public async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const page: number = parseInt(req.params.page);
      const pageSize: number = 5;
      const cacheKey: string = "posts/page/" + page;
      const dataCached: Promise<any> = await cache.get(cacheKey);

      if (dataCached === null) {
        const data = await Post.findAndCountAll({
          limit: pageSize,
          offset: page * pageSize,
          // where: {
          //   id: {
          //     [Op.lte]: page * 10,
          //   },
          // },
          order: [["createdAt", "DESC"]],
          attributes: [
            "id",
            "title",
            "content",
            "imgUrl",
            "createdAt",
            "updatedAt",
          ],
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
            // {
            //   model: Comment,
            //   as: "comments",
            //   attributes: ["id", "content", "createdAt", "updatedAt"],
            //   include: [
            //     {
            //       model: User,
            //       attributes: [
            //         "firstname",
            //         "lastname",
            //         "createdAt",
            //         "updatedAt",
            //       ],
            //     },
            //   ],
            // },
          ],
        });

        const dataResult: object = {
          page: page,
          pageSize: pageSize,
          total: data.count,
          posts: data.rows,
        };

        cache.set(cacheKey, dataResult, env.CACHE_TTL);

        return res.status(200).json(dataResult);
      }

      res.status(200).json(dataCached);
    } catch (error) {
      next(error);
    }
  }

  // Get post comments
  public async getPostComment(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const data: any = await Comment.findAndCountAll({
        where: {
          postID: id,
        },
        order: [["createdAt", "DESC"]],
        attributes: ["content", "createdAt", "updatedAt"],
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

      const dataResult: object = {
        postID: id,
        total: data.count,
        comments: data.rows,
      };

      res.status(200).json(dataResult);
    } catch (error) {
      next(error);
    }
  }

  // Create a post
  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.file !== undefined) {
        const post: any = await Post.create({
          userId: parseInt(req.body.userId),
          title: req.body.title,
          content: req.body.content,
          imgUrl: "/uploads/" + req.file.filename,
        });

        const data = await Post.findByPk(post.id, {
          attributes: [
            "id",
            "title",
            "content",
            "imgUrl",
            "createdAt",
            "updatedAt",
          ],
          include: [
            {
              model: User,
              attributes: ["firstname", "lastname", "createdAt", "updatedAt"],
            },
            {
              model: Comment,
              as: "comments",
              attributes: ["id", "content", "createdAt", "updatedAt"],
              include: [
                {
                  model: User,
                  attributes: [
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
            },
          ],
        });

        // Refresh the cache
        cache.removeByPattern("posts/page/");

        res.status(201).json(data);
      } else {
        const post: any = await Post.create({
          userId: parseInt(req.body.userId),
          title: req.body.title,
          content: req.body.content,
        });

        const data = await Post.findByPk(post.id, {
          attributes: [
            "id",
            "title",
            "content",
            "imgUrl",
            "createdAt",
            "updatedAt",
          ],
          include: [
            {
              model: User,
              attributes: ["firstname", "lastname", "createdAt", "updatedAt"],
            },
            {
              model: Comment,
              as: "comments",
              attributes: ["id", "content", "createdAt", "updatedAt"],
              include: [
                {
                  model: User,
                  attributes: [
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
            },
          ],
        });

        // Refresh the cache
        cache.removeByPattern("posts/page/");

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
      cache.removeByPattern("posts/page/");

      res.status(204).json(deletePost);
    } catch (error) {
      next(error);
    }
  }
}
