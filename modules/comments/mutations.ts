import "graphql-import-node";
import { createModule } from "graphql-modules";
import { Context } from "../../context";
import * as commentType from "./schema.graphql";

export const commentMutationsModule = createModule({
  id: "commentMutationsModule",
  dirname: __dirname,
  typeDefs: [commentType],
  resolvers: {
    Mutation: {},
  },
});
