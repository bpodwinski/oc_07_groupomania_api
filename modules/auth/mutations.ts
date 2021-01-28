import { signupUserDefinition, loginUserDefinition } from "./mutations.d";
import "graphql-import-node";
import { createModule } from "graphql-modules";
import { Context } from "../../context";
import { AuthenticationError } from "apollo-server";
import * as userType from "./schema.graphql";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as md5 from "md5";

export const authMutationsModule = createModule({
  id: "authMutationsModule",
  dirname: __dirname,
  typeDefs: [userType],
  resolvers: {
    Mutation: {
      signupUser: async (
        parent: any,
        args: signupUserDefinition,
        context: Context
      ) => {
        const checkUser = await context.prisma.user.findUnique({
          where: { email: args.email },
        });

        if (checkUser !== null) {
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
        const user = await context.prisma.user.findUnique({
          where: {
            email: args.email,
          },
        });

        if (!user) {
          return null;
        }

        if (bcrypt.compareSync(args.password, user.password)) {
          const token = jwt.sign(
            { userId: user.id },
            process.env.TOKEN || "3P5DEkDn8yz0H9IgVU22",
            {
              expiresIn: process.env.TOKEN_EXPIRES,
            }
          );
          return { ...user, token };
        }
      },
    },
  },
});
