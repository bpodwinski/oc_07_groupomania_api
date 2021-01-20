import AppError from "./middlewares/error";
import * as express from "express";
import * as path from "path";

export default class App {
  public app: express.Application;
  public host: string;
  public port: string;

  constructor(appInit: {
    host: string;
    port: string;
    middlewares: any;
    routes: any;
  }) {
    this.app = express();
    this.host = appInit.host;
    this.port = appInit.port;
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
    this.app.listen(parseInt(this.port), this.host, () => {
      console.log(
        `Environment ${process.env.NODE_ENV} -> ${process.env.APP_NAME} listening on the http://${this.host}:${this.port}`
      );
    });
  }
}
