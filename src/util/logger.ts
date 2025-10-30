import winston, { add, format } from "winston";
import chalk from "chalk";
import config from "../config/index";

// const environment = config.node_env;
const myToUpperCase = format((loggingObject) => {
  loggingObject.level = loggingObject.level.toUpperCase();
  return loggingObject;
});
const myTimestamp = format((loggingObject) => {
  loggingObject.timestamp = chalk.bold(loggingObject.timestamp);
  loggingObject.timestamp = chalk.gray(loggingObject.timestamp);
  return loggingObject;
});
const myPrintFn = ({
  //standard winston logging object properties
  level,
  stack,
  message,
  timestamp,
  //object containing custom properties
  ...metadata
}: winston.Logform.TransformableInfo) => {
  let addData = ``;
  if (Object.keys(metadata).length > 0) {
    addData += `${JSON.stringify(metadata)}`;
  }
  return `[${level}] ${timestamp} ${stack || message}\n${addData}`;
};
//formats
const consoleFormat = format.combine(
  format.timestamp({ format: "MM/DD/YYYY HH:mm:ss " }),
  myTimestamp(),

  myToUpperCase(),
  format.colorize({ level: true }),

  format.errors({ stack: true }),

  format.splat(),

  format.printf(({ level, stack, message, timestamp }) => {
    return `[${level}] ${timestamp} ${stack || message}`;
  })
);

const fileFormat = format.combine(
  format.timestamp({ format: "MM/DD/YYYY HH:mm:ss " }),

  myToUpperCase(),

  format.errors({ stack: true }),

  format.splat(),

  format.printf(myPrintFn)
);

const consoleTransport = new winston.transports.Console({
  level: "debug",
  format: consoleFormat,
});

//creating custom logger
const logger = winston.createLogger({
  level: config.node_env === "DEVELOPMENT" ? "debug" : "warn",
  transports: [
    new winston.transports.File({
      format: fileFormat,
      filename: `/combined.log`,
      dirname: config.logDir,
    }),
    new winston.transports.File({
      level: "error",
      format: fileFormat,
      filename: `/errors.log`,
      dirname: config.logDir,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      format: fileFormat,
      filename: `/exceptions.log`,
      dirname: config.logDir,
    }),
  ],
});

if (config.node_env === "DEVELOPMENT") {
  logger.add(consoleTransport);
}
export default logger;
