import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as cache from "cache-all/redis";
import { env } from "../utils/env";

import Error from "../exceptions/app";

// Routes import
import User from "../models/user";

export default class UserController {
  // Register
  public async userRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const getUserByEmail = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (getUserByEmail != null) {
        throw new Error(401, "User already exists");
      } else {
        const data = await User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          service: req.body.service,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          //avatar: req.file.filename,
        });

        // Refresh the cache
        cache.removeByPattern("users_all");

        return res.status(201).json(data);
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
          token: jwt.sign({ userId: user.id }, env.TOKEN, {
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
