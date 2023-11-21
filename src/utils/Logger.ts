/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
export type LoggerOptions = {
  prefix: string;
  debug: boolean;
};

class Logger {
  private prefix: string;
  private debug: boolean;

  constructor(options: LoggerOptions) {
    this.prefix = options.prefix;
    this.debug = options.debug;
  }

  /** bypass the debug prop to show info to console regardless */
  public info(...args: any[]): void {
    console.info(this.prefix, ...args);
  }

  public log(...args: any[]): void {
    if (this.debug) {
      console.log(this.prefix, ...args);
    }
  }

  public error(...args: any[]): void {
    if (this.debug) {
      console.error(this.prefix, ...args);
    }
  }

  public warn(...args: any[]): void {
    if (this.debug) {
      console.warn(this.prefix, ...args);
    }
  }
}

export default Logger;
