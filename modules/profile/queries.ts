import { profileDefinition } from "./queries.d";
import "graphql-import-node";
import { createModule } from "graphql-modules";
import { Context } from "../../context";
import * as profileType from "./schema.graphql";

export const profileQueriesModule = createModule({
  id: "profileQueriesModule",
  dirname: __dirname,
  typeDefs: [profileType],
  resolvers: {
    Query: {
      profile: async (
        parent: any,
        args: profileDefinition,
        context: Context
      ) => {
        return await context.prisma.user.findUnique({
          where: {
            id: args.id,
          },
          select: {
            id: true,
            firstname: true,
            lastname: true,
            service: true,
            email: true,
            gravatar: true,
            createdAt: true,
            updatedAt: true,
            posts: {
              select: {
                id: true,
                title: true,
                content: true,
                imgUrl: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        });
      },
    },
  },
});
