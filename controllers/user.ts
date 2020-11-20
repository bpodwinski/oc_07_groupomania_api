import conf from "../utils/config";

import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import Error from "../exceptions/app";

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

  // Register
  public async userRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const getUserByEmail: any = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if ((await getUserByEmail) != null) {
        throw new Error(401, "User already exists");
      } else {
        const user: any = await User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          service: req.body.service,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          //avatar: req.file.filename,
        });
        res.status(201).json(user);
      }
    } catch (error) {
      next(error);
    }
  }

  // Login
  public async userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const email: string = req.body.email;
      const user: any = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new Error(401, "User not found");
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({
          userId: user.id,
          token: jwt.sign({ userId: user.id }, conf.TOKEN, {
            expiresIn: "1h",
          }),
        });
      } else {
        throw new Error(401, "Passwords don't match");
      }
    } catch (error) {
      next(error);
    }
  }

  // Logout
  public async userLogout(req: Request, res: Response, next: NextFunction) {
    try {
      let token: string = req.cookies.token;
      if (!token) return res.send({ token: null });

      return res.clearCookie("token");
    } catch (error) {
      next(error);
    }
  }
}
