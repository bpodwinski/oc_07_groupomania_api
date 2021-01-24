import "graphql-import-node";
import { createModule } from "graphql-modules";
import { Context } from "../../context";
import * as postType from "./schema.graphql";

export const postMutationsModule = createModule({
  id: "postMutationsModule",
  dirname: __dirname,
  typeDefs: [postType],
  resolvers: {
    Mutation: {
      createPost: async (parent: any, args: any, ctx: Context) => {
        return ctx.prisma.post.create({
          data: {
            userId: parseInt(args.userId),
            title: args.title,
            content: args.content,
          },
        });
      },
    },
  },
});
