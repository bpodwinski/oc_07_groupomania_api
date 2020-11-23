import { env } from "../utils/env";
import Error from "../exceptions/app";

import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

// Routes import
import User from "../models/user";
import Post from "../models/post";

export default class UserController {
  // Get all users
  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user: any = await User.findAll();
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  // Get one user by ID
  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const user: any = await User.findByPk(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  // Get one user and posts by ID
  public async getUserPostById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id: number = parseInt(req.params.id);
      const user: any = await User.findAll({
        where: {
          id: id,
        },
        include: [
          {
            model: Post,
          },
        ],
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
