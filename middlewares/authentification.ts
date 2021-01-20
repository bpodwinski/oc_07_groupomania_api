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

      const jwtPayload: any = jwt.verify(
        token,
        process.env.TOKEN || "3P5DEkDn8yz0H9IgVU22"
      );
      res.locals.jwtPayload = jwtPayload;

      next();
    } catch (error) {
      next(new AuthError(error.message));
    }
  }
}
