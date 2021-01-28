import { rule, shield } from "graphql-shield";
import { Context } from "../context";
import { getUserId } from "../utils/auth";

const rules = {
  isAuthenticated: rule()((parent: any, args: any, context: Context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
};

export const permissions = shield({
  Query: {
    users: rules.isAuthenticated,
    profile: rules.isAuthenticated,
    post: rules.isAuthenticated,
    posts: rules.isAuthenticated,
    comment: rules.isAuthenticated,
    comments: rules.isAuthenticated,
  },
  Mutation: {
    updateProfile: rules.isAuthenticated,
    createPost: rules.isAuthenticated,
    createComment: rules.isAuthenticated,
  },
});
