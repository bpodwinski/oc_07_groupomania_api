/**
 * @author  Benoit Podwinski <me@benoitpodwinski.com>
 */

import { createPostDefinition } from "./mutations.d";
import "graphql-import-node";
import { createModule } from "graphql-modules";
import { Context } from "../../context";
import * as postType from "./schema.graphql";
import { getUserId } from "../../utils/auth";

export const postsMutationsModule = createModule({
  id: "postsMutationsModule",
  dirname: __dirname,
  typeDefs: [postType],
  resolvers: {
    Mutation: {
      createPost: async (
        parent: any,
        args: createPostDefinition,
        context: Context
      ) => {
        const userId = getUserId(context);

        if (userId) {
          return context.prisma.post.create({
            data: {
              user_id: userId,
              title: args.title,
              content: args.content,
            },
          });
        }
      },
    },
  },
});
