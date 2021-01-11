import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as cache from "cache-all/redis";
import * as md5 from "md5";
import { env } from "../utils/env";

import Error from "../exceptions/app";

// Routes import
import User from "../models/user";
import user from "../models/user";

export default class UserController {
  // Register
  public async userRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const getUserByEmail = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (getUserByEmail !== null) {
        throw new Error(401, "User already exists");
      } else {
        const gravatar: any =
          "https://www.gravatar.com/avatar/" +
          md5(req.body.email.trim().toLowerCase()) +
          "?d=retro";

        const createUser = await User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          service: req.body.service,
          email: req.body.email,
          gravatar: gravatar,
          role: "user",
          password: bcrypt.hashSync(req.body.password, 10),
        });

        const response: object = {
          firstname: createUser.firstname,
          lastname: createUser.lastname,
          service: createUser.service,
          email: createUser.email,
          role: "user",
          gravatar: createUser.gravatar,
        };

        // Refresh the cache
        cache.removeByPattern("users_all");

        return res.status(201).json(response);
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
        return res.status(202).json({
          httpStatus: 202,
          type: 1,
          message: "User not found",
        });
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(200).json({
          httpStatus: 200,
          type: 0,
          userId: user.id,
          token: jwt.sign({ userId: user.id }, env.TOKEN, {
            expiresIn: "1h",
          }),
        });
      } else {
        return res.status(202).json({
          httpStatus: 202,
          type: 2,
          message: "Passwords don't match",
        });
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
