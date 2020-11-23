import { env } from "../utils/env";
import Error from "../exceptions/app";
import AuthError from "../exceptions/auth";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export default class Auth {
  public auth(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader: any = req.headers["authorization"];
      const token: any = authHeader && authHeader.split(" ")[1];

      if (token === null) throw new Error(401, "There isn't token");

      const decodedToken: any = jwt.verify(token, env.TOKEN);
      const userId: string = decodedToken.userId;

      if (req.body.userId && req.body.userId !== userId) {
        throw new Error(401, "Invalid user ID");
      } else {
        next();
      }
    } catch (error) {
      next(new AuthError(error.message));
    }
  }
}
