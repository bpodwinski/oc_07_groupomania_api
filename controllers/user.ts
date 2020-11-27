import Error from "../exceptions/app";

import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";

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

  // Update user informations
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const user: any = await User.update(
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          service: req.body.service,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
