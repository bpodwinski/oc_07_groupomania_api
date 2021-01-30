import { createCommentDefinition } from "./mutations.d";
import "graphql-import-node";
import { createModule } from "graphql-modules";
import { Context } from "../../context";
import * as commentType from "./schema.graphql";
import { getUserId } from "../../utils/auth";

export const commentsMutationsModule = createModule({
  id: "commentsMutationsModule",
  dirname: __dirname,
  typeDefs: [commentType],
  resolvers: {
    Mutation: {
      createComment: async (
        parent: any,
        args: createCommentDefinition,
        context: Context
      ) => {
        const userId = getUserId(context);

        if (userId) {
          return context.prisma.comment.create({
            data: {
              user_id: userId,
              post_id: args.postId,
              content: args.content,
            },
          });
        }
      },
    },
  },
});
