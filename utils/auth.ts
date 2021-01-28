import * as jwt from "jsonwebtoken";
import { Context } from "../context";

type Token = {
  userId: number;
};

export function getUserId(context: Context) {
  const Authorization: string = context.req.get("Authorization");

  if (Authorization) {
    const token: string = Authorization.replace("Bearer ", "");
    const verifiedToken = jwt.verify(
      token,
      process.env.TOKEN || "3P5DEkDn8yz0H9IgVU22"
    ) as Token;

    return verifiedToken.userId;
  }
}
