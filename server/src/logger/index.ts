import fs from 'fs';
import { join } from 'path';
import { configure, getLogger } from 'log4js';
import MyLogger from './mylogger';

interface Stringable {
  toString: () => string;
}

let Log: MyLogger;

const logStream = {
  write(message: Stringable): void {
    Log.info(message.toString());
  },
};

const morganTokens =
  ':remote-addr - :remote-user [:date[iso]] \':method :url HTTP/:http-version\' :status :res[content-length] \':referrer\' \':user-agent\'';

function initLogger(loggerName: string, path: string, level: string): void {
  const infoFile = join(path, 'info.log');
  const debugFile = join(path, 'debug.log');
  const warnFile = join(path, 'warn.log');

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  configure({
    appenders: {
      console: { type: 'stdout' },
      file: { type: 'file', filename: infoFile },
      fileDebug: { type: 'file', filename: debugFile },
      fileWarns: { type: 'file', filename: warnFile },
      //consoleFilter: { type: "logLevelFilter", appender: "console", level: "DEBUG" /*"INFO"*/ },
      consoleFilter: { type: 'logLevelFilter', appender: 'console', level: level },
      warnPlus: { type: 'logLevelFilter', appender: 'fileWarns', level: 'WARN' },
      debugPlus: { type: 'logLevelFilter', appender: 'fileDebug', level: 'TRACE' },
    },
    categories: {
      //default: { appenders: ["console", "file"], level: logLevel },
      default: { appenders: ['consoleFilter', 'warnPlus', 'debugPlus'], level: level },
    },
  });
  Log = new MyLogger(getLogger(loggerName));
}

export { initLogger, Log, morganTokens, logStream };
