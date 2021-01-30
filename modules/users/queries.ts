/**
 * @author  Benoit Podwinski <me@benoitpodwinski.com>
 */

import { createModule } from "graphql-modules";
import "graphql-import-node";

import { usersDefinition } from "./queries.d";
import { Context } from "../../context";
import * as usersType from "./schema.graphql";

export const usersQueriesModule = createModule({
  id: "usersQueriesModule",
  dirname: __dirname,
  typeDefs: [usersType],
  resolvers: {
    Query: {
      users: async (parent: any, args: usersDefinition, context: Context) => {
        return await context.prisma.user.findMany({
          orderBy: {
            created_at: "desc",
          },
          include: { post: true },
        });
      },
    },
  },
});
