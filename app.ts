import AppError from "./middlewares/error";
import * as config from "./config/config";
import { Sequelize } from "sequelize-typescript";
import * as express from "express";
import * as path from "path";

export default class App {
  public app: express.Application;
  public host: string;
  public port: number;

  constructor(appInit: {
    host: string;
    port: number;
    middlewares: any;
    routes: any;
  }) {
    this.app = express();
    this.host = appInit.host;
    this.port = appInit.port;

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
      database: config.DB_NAME,
      host: config.DB_HOST,
      username: config.DB_USER,
      password: config.DB_PASS,
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
      console.log(`App listening on the http://${this.host}:${this.port}`);
    });
  }
}
