/**
 * @author  Benoit Podwinski <me@benoitpodwinski.com>
 */

import { createModule } from "graphql-modules";
import "graphql-import-node";
import { AuthenticationError } from "apollo-server";
import * as bcrypt from "bcrypt";
import * as md5 from "md5";
import * as jwt from "jsonwebtoken";

import { signupUserDefinition, loginUserDefinition } from "./mutations.d";
import { Context } from "../../context";
import * as userType from "./schema.graphql";
import verifyPassword from "../../utils/password";

export const authMutationsModule = createModule({
  id: "AuthenticationMutation",
  dirname: __dirname,
  typeDefs: [userType],
  resolvers: {
    Mutation: {
      signupUser: async (
        parent: any,
        args: signupUserDefinition,
        context: Context
      ) => {
        await verifyPassword(args.password);

        const checkEmail = await context.prisma.user.findFirst({
          where: {
            email: args.email,
          },
        });

        if (checkEmail) {
          throw new AuthenticationError("User already exists");
        }

        const gravatar: string =
          "https://www.gravatar.com/avatar/" +
          md5(args.email.trim().toLowerCase()) +
          "?d=retro";

        return context.prisma.user.create({
          data: {
            firstname: args.firstname,
            lastname: args.lastname,
            service: args.service,
            email: args.email,
            gravatar: gravatar,
            role: "user",
            password: bcrypt.hashSync(args.password, 10),
          },
        });
      },
      loginUser: async (
        parent: any,
        args: loginUserDefinition,
        context: Context
      ) => {
        const user = await context.prisma.user.findFirst({
          where: {
            email: args.email,
          },
        });

        if (!user) {
          throw new AuthenticationError("User not found");
        }

        if (bcrypt.compareSync(args.password, user.password)) {
          const token = jwt.sign(
            { userId: user.id },
            process.env.TOKEN || "3P5DEkDn8yz0H9IgVU22",
            {
              expiresIn: "1h",
            }
          );
          return { ...user, token };
        } else {
          throw new AuthenticationError("Password don't match");
        }
      },
    },
  },
});
