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
            id: Number(args.id),
          },
        });
      },
    },
  },
});
