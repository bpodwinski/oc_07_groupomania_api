/**
 * @author  Benoit Podwinski <me@benoitpodwinski.com>
 */

import { postDefinition } from "./queries.d";
import "graphql-import-node";
import { createModule } from "graphql-modules";
import { Context } from "../../context";
import * as postType from "./schema.graphql";

export const postsQueriesModule = createModule({
  id: "postsQueriesModule",
  dirname: __dirname,
  typeDefs: [postType],
  resolvers: {
    Query: {
      post: async (parent: any, args: postDefinition, context: Context) => {
        return await context.prisma.post.findUnique({
          where: {
            id: Number(args.id),
          },
          include: { user: true },
        });
      },
      posts: async (parent: any, args: any, context: Context) => {
        const pageSize: number = 5;

        return await context.prisma.post.findMany({
          take: pageSize,
          include: { user: true },
        });
      },
    },
  },
});
