import { Request, Response, NextFunction } from "express";
import * as cache from "cache-all/redis";
import { env } from "../utils/env";
import * as bcrypt from "bcrypt";

// Routes import
import User from "../models/user";

export default class UserController {
  // Get all users
  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dataCached: Promise<any> = await cache.get("users_all");

      if (dataCached === null) {
        const data = await User.findAll();
        cache.set("users_all", data, env.CACHE_TTL);
        return res.status(200).json(data);
      }

      return res.status(200).json(dataCached);
    } catch (error) {
      next(error);
    }
  }

  // Get one user by ID
  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const dataCached: Promise<any> = await cache.get("user/" + id);

      if (dataCached === null) {
        const data = await User.findByPk(id);
        cache.set("user/" + id, data, env.CACHE_TTL);
        return res.status(200).json(data);
      }

      res.status(200).json(dataCached);
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
