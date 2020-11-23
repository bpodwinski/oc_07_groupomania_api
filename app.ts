import { env } from "./utils/env";

import AppError from "./middlewares/error";
import { Sequelize } from "sequelize-typescript";
import * as express from "express";
import * as path from "path";

export default class App {
  public app: express.Application;
  public host: string;
  public port: number;
  public db_name: string;
  public db_host: string;
  public db_user: string;
  public db_pass: string;

  constructor(appInit: {
    host: string;
    port: number;
    db_name: string;
    db_host: string;
    db_user: string;
    db_pass: string;
    middlewares: any;
    routes: any;
  }) {
    this.app = express();
    this.host = appInit.host;
    this.port = appInit.port;
    this.db_name = appInit.db_name;
    this.db_host = appInit.db_host;
    this.db_user = appInit.db_user;
    this.db_pass = appInit.db_pass;

    this.db();
    this.options();
    this.middlewares(appInit.middlewares);
    this.routes(appInit.routes);
    this.handlerError();
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
      username: this.db_user,
      password: this.db_pass,
      dialect: "mysql",
      storage: "mysql",
      models: [__dirname + "/models/**/*.ts"],
    });

    sequelize.sync({ force: false });
  }

  private options() {
    this.app.use("/img", express.static(path.join(__dirname, "../img")));
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
