import { createApplication } from "graphql-modules";
import { authQueriesModule } from "./modules/auth/queries";
import { authMutationsModule } from "./modules/auth/mutations";
import { postQueriesModule } from "./modules/posts/queries";
import { postMutationsModule } from "./modules/posts/mutations";
import { commentQueriesModule } from "./modules/comments/queries";
import { commentMutationsModule } from "./modules/comments/mutations";

export const app = createApplication({
  modules: [
    authQueriesModule,
    authMutationsModule,
    postQueriesModule,
    postMutationsModule,
    commentQueriesModule,
    commentMutationsModule,
  ],
});
