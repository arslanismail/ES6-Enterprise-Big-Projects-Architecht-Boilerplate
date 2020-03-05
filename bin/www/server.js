import express from "express";
import bodyParser from "body-parser";
import http from "http";
import helmet from "helmet";
import compression from "compression";
import { Logger, AppSetting } from "../../config";

// import { HeaderMiddleware } from "../../lib/middleware";
import ApiRouting from "../../config/api.routing";

class Server {
  constructor() {
    this.app = express();
    this.router = express.Router();
    this.configure();
  }

  configure() {
    this.configureMiddleware();
    this.configureRoutes();
  //   this.errorHandler();
  }

  configureMiddleware() {
    // this.CONFIG = AppSetting.getConfig();
    // this.app.use(express.static("public"));
    // this.app.use(compression());
    this.app.use(bodyParser.urlencoded({
      extended: false
    }));
    this.app.use(bodyParser.json());
    console.log('middlewarees are loaded')
    // this.app.use(AppResponse(this.CONFIG.APP.SOURCE));
  //   this.enableHelmet();
    Logger.configureLogger(this.app);
  //   ApiDoc.publish(this.app);
  //   this.app.use(HeaderMiddleware.AUTHORIZE());
  //   this.app.use(AuthMiddleware());
  }
  // enableHelmet() {
  //   this.app.use(helmet());
  //   this.app.use(helmet.hidePoweredBy());
  //   this.app.use(helmet.hsts({ maxAge: 7776000000 }));
  //   this.app.use(helmet.frameguard("SAMEORIGIN"));
  //   this.app.use(helmet.xssFilter({ setOnOldIE: true }));
  //   this.app.use(helmet.noSniff());
  // }

  configureRoutes() {
  
    ApiRouting.ConfigureRouters(this.app);
  }

  // errorHandler() {
  //   this.app.use(function(err, req, res, next) {
  //     Logger.error(err);
  //     console.log(err);
  //     if (!AppSetting.isProduction()) {
  //       res.serverError(err);
  //     } else if (err instanceof AppError) {
  //       res.serverError(err);
  //     } else {
  //       res.serverError(new AppError("ERR_OTP_SERVICE"));
  //     }
  //   });
  //   // catch 404 and forward to error handler
  //   this.app.use((req, res, next) => {
  //     res.notFound(new AppError("ERR_INVALID_PATH"));
  //   });
  // }

  run() {
    let server = http.createServer(this.app);
    const ENV = AppSetting.getConfig();
    server.listen(ENV.APP.PORT, () => {
      if (!AppSetting.isProduction()) {
        console.log(
          `Environment variables are: ${JSON.stringify(ENV, null, 2)}`
        );
      }
      console.log(`${ENV.APP.NAME} - is listening on ${server.address().port}`);
    });
    server.on("error", this.onError);
  }

  onError(error) {
    console.log('here is in the rendering error server.js on error')
    console.log(error);
    const port = AppSetting.getConfig().APP.PORT;
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        Logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        Logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
}
export default new Server();
