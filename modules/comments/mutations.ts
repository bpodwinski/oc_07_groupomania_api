import "graphql-import-node";
import { createModule } from "graphql-modules";
import { Context } from "../../context";
import * as commentType from "./schema.graphql";

export const commentsMutationsModule = createModule({
  id: "commentsMutationsModule",
  dirname: __dirname,
  typeDefs: [commentType],
  resolvers: {
    Mutation: {},
  },
});
