import { Logger } from "pino";
import { LoggerApi } from "./logger.api";
// import { TraceConstants } from "../util/opentracing/trace-constants";

import logger from "pino-http";

import pino from "pino";

class ChildLogger extends LoggerApi {
  constructor(private logger: Logger) {
    super();
  }

  error(message: string, context?: object): void {
    if (context) {
      this.logger.error(context, message);
    } else {
      this.logger.error(message);
    }
  }

  log(message: string, context?: object): void {
    if (context) {
      this.logger.info(context, message);
    } else {
      this.logger.info(message);
    }
  }

  debug(message: string, context?: object): void {
    if (context) {
      this.logger.debug(context, message);
    } else {
      this.logger.debug(message);
    }
  }

  info(message: string, context?: object): void {
    if (context) {
      this.logger.info(context, message);
    } else {
      this.logger.info(message);
    }
  }

  warn(message: string, context?: object): void {
    if (context) {
      this.logger.warn(context, message);
    } else {
      this.logger.warn(message);
    }
  }

  fatal(message: string, context?: object): void {
    if (context) {
      this.logger.fatal(context, message);
    } else {
      this.logger.fatal(message);
    }
  }

  trace(message: string, context?: object): void {
    if (context) {
      this.logger.trace(context, message);
    } else {
      this.logger.trace(message);
    }
  }

  child(component: string): LoggerApi {
    // const clsNamespace = getNamespace(TraceConstants.NAMESPACE);

    // const traceContext = clsNamespace
    //   ? clsNamespace.get(TraceConstants.TRACE_CONTEXT)
    //   : {};
    const traceContext = {};

    return new ChildLogger(
      this.logger.child(Object.assign({ component }, traceContext))
    );
  }

  apply(app: { use: (app: any) => void }): void {
    app.use(logger({}));
  }
}

export class PinoLoggerService extends ChildLogger {
  constructor() {
    super(PinoLoggerService.buildLogger());
  }

  static buildLogger() {
    return pino();
  }
}
