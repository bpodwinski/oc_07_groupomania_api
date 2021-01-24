import * as jwt from "jsonwebtoken";
import { Context } from "../context";

interface Token {
  userId: string;
}

export function getUserId(context: Context) {
  const Authorization = context.req.get("Authorization");

  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = jwt.verify(
      token,
      process.env.TOKEN || "3P5DEkDn8yz0H9IgVU22"
    ) as Token;
    return verifiedToken && verifiedToken.userId;
  }
}
