import "graphql-import-node";
import { createModule } from "graphql-modules";
import { Context } from "../../context";
import * as commentType from "./schema.graphql";

export const commentsQueriesModule = createModule({
  id: "commentsQueriesModule",
  dirname: __dirname,
  typeDefs: [commentType],
  resolvers: {
    Query: {
      comments: async (parent: any, args: any, ctx: Context) => {
        return await ctx.prisma.comment.findMany({
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            postId: true,
            userId: true,
            content: true,
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
            post: {
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
      comment: async (parent: any, args: any, ctx: Context) => {
        return await ctx.prisma.comment.findUnique({
          where: {
            id: parseInt(args.id),
          },
          select: {
            id: true,
            postId: true,
            userId: true,
            content: true,
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
            post: {
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
