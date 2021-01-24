import { ApolloServer } from "apollo-server";
import { applyMiddleware } from "graphql-middleware";
import { app } from "./app";
import { createContext } from "./context";
import { permissions } from "./middlewares/permission";

const schema = app.createSchemaForApollo();

new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  cors: {
    origin: process.env.URL_CORS,
    credentials: true,
    methods: "HEAD,GET,POST",
    allowedHeaders:
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  },
  context: createContext,
}).listen({ host: process.env.HOST, port: process.env.PORT }, () =>
  console.log(
    `🚀 Environment ${process.env.NODE_ENV} -> ${process.env.APP_NAME} listening on the http://${process.env.HOST}:${process.env.PORT}`
  )
);
