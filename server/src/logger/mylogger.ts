import { Logger } from 'log4js';

interface Stringable {
  toString: () => string;
}

class MyLogger {
  /*
   * Couldn't extend Logger due to :
   * TypeError: Class extends value undefined is not a constructor or null
   */
  target: Logger;

  constructor(target: Logger) {
    this.target = target;
  }
  trace(message: Stringable, ...args: Stringable[]): MyLogger {
    this.target.trace(message, ...args);
    return this;
  }
  debug(message: Stringable, ...args: Stringable[]): MyLogger {
    this.target.debug(message, ...args);
    return this;
  }
  info(message: Stringable, ...args: Stringable[]): MyLogger {
    this.target.info(message, ...args);
    return this;
  }
  warn(message: Stringable, ...args: Stringable[]): MyLogger {
    this.target.warn(message, ...args);
    return this;
  }
  error(message: Stringable, ...args: Stringable[]): MyLogger {
    this.target.error(message, ...args);
    return this;
  }
  fatal(message: Stringable, ...args: Stringable[]): MyLogger {
    this.target.fatal(message, ...args);
    return this;
  }
}

export default MyLogger;
