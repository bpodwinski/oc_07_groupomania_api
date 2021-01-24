import "graphql-import-node";
import { createModule } from "graphql-modules";
import { Context } from "../../context";
import * as postType from "./schema.graphql";

export const postQueriesModule = createModule({
  id: "postQueriesModule",
  dirname: __dirname,
  typeDefs: [postType],
  resolvers: {
    Query: {
      posts: async (parent: any, args: any, ctx: Context) => {
        const pageSize: number = 5;

        return await ctx.prisma.post.findMany({
          take: pageSize,
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          select: {
            id: true,
            title: true,
            content: true,
            imgUrl: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                service: true,
                email: true,
                gravatar: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        });
      },
      post: async (parent: any, args: any, ctx: Context) => {
        return await ctx.prisma.post.findUnique({
          where: {
            id: parseInt(args.id),
          },
          select: {
            id: true,
            title: true,
            content: true,
            imgUrl: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                service: true,
                email: true,
                gravatar: true,
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
