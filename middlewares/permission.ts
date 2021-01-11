import Error from "../exceptions/app";
import { Request, Response, NextFunction } from "express";

// Models import
import User from "../models/user";

export const role = (role: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.jwtPayload.userId;
    const getUser = await User.findByPk(userId);
    const user: any = getUser;

    if (role.indexOf(user.role) > -1) {
      return next();
    } else {
      next(new Error(401, "Not authorized"));
    }
  };
};
