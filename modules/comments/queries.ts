import { commentDefinition } from "./queries.d";
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
      comment: async (
        parent: any,
        args: commentDefinition,
        context: Context
      ) => {
        return await context.prisma.comment.findUnique({
          where: {
            id: Number(args.id),
          },
          include: {
            user: true,
            post: true,
          },
        });
      },
      comments: async (parent: any, args: any, context: Context) => {
        return await context.prisma.comment.findMany({
          orderBy: {
            created_at: "desc",
          },
          include: {
            user: true,
            post: true,
          },
        });
      },
    },
  },
});
