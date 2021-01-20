import { Request, Response, NextFunction } from "express";
import db from "../prisma";
import Error from "../exceptions/app";

export default class UserController {
  // Get all users
  public async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await db.user.findMany();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // Get one user by ID
  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const data = await db.user.findUnique({
        where: {
          id: id,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // Update user informations
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = parseInt(req.params.id);
      const user: any = await db.user.update({
        data: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          service: req.body.service,
          email: req.body.email,
        },
        where: {
          id: id,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  // Delete user
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(res.locals.jwtPayload.userId);
      const getUser = await db.user.findUnique({
        where: {
          id: userId,
        },
      });
      const user: any = getUser;

      if (userId === parseInt(req.params.id) || user.role === "admin") {
        const user: any = await db.user.delete({
          where: {
            id: parseInt(req.params.id),
          },
        });
        return res.status(200).json({ message: user });
      }

      next(new Error(401, "Not authorized"));
    } catch (error) {
      next(error);
    }
  }
}
