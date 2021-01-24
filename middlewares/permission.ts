import { rule, shield } from "graphql-shield";
import { getUserId } from "../utils/auth";

const rules = {
  isAuthenticated: rule()((parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
};

export const permissions = shield({
  Query: {
    users: rules.isAuthenticated,
    posts: rules.isAuthenticated,
  },
});
