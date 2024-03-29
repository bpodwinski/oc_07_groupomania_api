import { env } from "./utils/env";

import AppError from "./middlewares/error";
import { Sequelize } from "sequelize-typescript";
import * as express from "express";
import * as cache from "cache-all/redis";
import * as path from "path";

export default class App {
  public app: express.Application;
  //public cache: void;
  public host: string;
  public port: number;
  public db_name: string;
  public db_host: string;
  public db_port: number;
  public db_user: string;
  public db_pass: string;
  public redis_db: string | undefined;
  public redis_port: number;
  public redis_host: string;
  public redis_pass: string | undefined;
  public redis_prefix: string | undefined;
  public cache_ttl: number;
  public cache_enable: boolean;

  constructor(appInit: {
    host: string;
    port: number;
    db_name: string;
    db_host: string;
    db_port: number;
    db_user: string;
    db_pass: string;
    redis_db: string | undefined;
    redis_port: number;
    redis_host: string;
    redis_pass: string | undefined;
    redis_prefix: string | undefined;
    cache_ttl: number;
    cache_enable: boolean;
    middlewares: any;
    routes: any;
  }) {
    this.app = express();
    this.host = appInit.host;
    this.port = appInit.port;
    this.db_name = appInit.db_name;
    this.db_host = appInit.db_host;
    this.db_port = appInit.db_port;
    this.db_user = appInit.db_user;
    this.db_pass = appInit.db_pass;
    this.redis_db = appInit.redis_db;
    this.redis_port = appInit.redis_port;
    this.redis_host = appInit.redis_host;
    this.redis_pass = appInit.redis_pass;
    this.redis_prefix = appInit.redis_prefix;
    this.cache_ttl = appInit.cache_ttl;
    this.cache_enable = appInit.cache_enable;

    this.cacheRoutes();
    this.db();
    this.options();
    this.middlewares(appInit.middlewares);
    this.routes(appInit.routes);
    this.handlerError();
  }

  private cacheRoutes() {
    cache.init({
      ttl: this.cache_ttl,
      isEnable: this.cache_enable,
      redis: {
        port: this.redis_port,
        host: this.redis_host,
        password: this.redis_pass,
        database: this.redis_db,
        prefix: this.redis_prefix,
      },
    });
  }

  private middlewares(middlewares: {
    forEach: (arg0: (middleware: any) => void) => void;
  }) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
    routes.forEach((routes) => {
      this.app.use("/api", routes.router);
    });
  }

  private db() {
    const sequelize = new Sequelize({
      database: this.db_name,
      host: this.db_host,
      port: this.db_port,
      username: this.db_user,
      password: this.db_pass,
      dialect: "mysql",
      storage: "mysql",
      models: [__dirname + "/models"],
    });

    sequelize.sync({ force: false });
  }

  private options() {
    this.app.use(
      "/uploads",
      express.static(path.join(__dirname, "./var/uploads"))
    );
  }

  private handlerError() {
    this.app.use(AppError);
  }

  public listen() {
    this.app.listen(this.port, this.host, () => {
      console.log(
        `Environment ${process.env.NODE_ENV} -> ${env.APP_NAME} listening on the http://${this.host}:${this.port}`
      );
    });
  }
}
