import "graphql-import-node";
import { createModule } from "graphql-modules";
import { Context } from "../../context";
import * as userType from "./schema.graphql";

export const authQueriesModule = createModule({
  id: "authQueriesModule",
  dirname: __dirname,
  typeDefs: [userType],
  resolvers: {
    Query: {
      users: async (parent: any, args: any, ctx: Context) => {
        return await ctx.prisma.user.findMany({
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
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
