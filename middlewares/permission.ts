import Error from "../exceptions/app";
import { Request, Response, NextFunction } from "express";
import db from "../prisma";

export const role = (role: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = res.locals.jwtPayload.userId;
    const getUser = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    const user: any = getUser;

    if (role.indexOf(user.role) > -1) {
      return next();
    } else {
      next(new Error(401, "Not authorized"));
    }
  };
};
