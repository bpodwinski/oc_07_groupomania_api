import "graphql-import-node";
import { createModule } from "graphql-modules";
import { Context } from "../../context";
import * as profileType from "./schema.graphql";
import * as bcrypt from "bcrypt";
import * as md5 from "md5";

export const profileMutationsModule = createModule({
  id: "profileMutationsModule",
  dirname: __dirname,
  typeDefs: [profileType],
  resolvers: {
    Mutation: {
      updateProfile: async (parent: any, args: any, ctx: Context) => {
        let gravatar: string | undefined;

        if (args.email) {
          gravatar =
            "https://www.gravatar.com/avatar/" +
            md5(args.email.trim().toLowerCase()) +
            "?d=retro";
        } else {
          gravatar = undefined;
        }

        if (args.password) {
          const salt = bcrypt.genSaltSync(10);
          args.password = bcrypt.hashSync(args.password, salt);
        }

        return await ctx.prisma.user.update({
          where: { id: parseInt(args.id) },
          data: {
            id: parseInt(args.id),
            firstname: args.firstname,
            lastname: args.lastname,
            service: args.service,
            email: args.email,
            gravatar: gravatar,
            password: args.password,
          },
        });
      },
    },
  },
});
