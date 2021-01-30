import { createApplication } from "graphql-modules";

import { authMutationsModule } from "./modules/auth/mutations";

import { usersQueriesModule } from "./modules/users/queries";

import { profileQueriesModule } from "./modules/profile/queries";
import { profileMutationsModule } from "./modules/profile/mutations";

import { postsQueriesModule } from "./modules/posts/queries";
import { postsMutationsModule } from "./modules/posts/mutations";

import { commentsQueriesModule } from "./modules/comments/queries";
import { commentsMutationsModule } from "./modules/comments/mutations";

export const app = createApplication({
  modules: [
    authMutationsModule,
    profileQueriesModule,
    profileMutationsModule,
    usersQueriesModule,
    postsQueriesModule,
    postsMutationsModule,
    commentsQueriesModule,
    commentsMutationsModule,
  ],
});
