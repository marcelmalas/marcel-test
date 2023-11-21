import Logger, { LoggerOptions } from "./Logger";

const loggerOptions: LoggerOptions = {
  prefix: "MyApp",
  debug: true,
};

const logger = new Logger(loggerOptions);

export default logger;
