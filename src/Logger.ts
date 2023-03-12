
import Levels, {
  DEBUG,
  ERROR,
  FATAL,
  INFO,
  WARN,
} from './levels';
import consoleOutput from './outputs/consoleOutput';
import { LoggerContext, LoggerEvent, LoggerOptions } from './struct';
import { getErrorDetails } from './util';


const defaultOptions:LoggerOptions = {
  active: true,
  defaultContext: null,
  filter: null,
  level: INFO,
  name: null,
  outputs: [consoleOutput()],
};

class Logger {
  active: boolean
  defaultContext?: LoggerContext|null
  filter?: ((event:LoggerEvent)=>boolean)|null
  level: Levels
  name: string
  outputs: ((event:LoggerEvent)=>void)[]
  
  constructor(options:Partial<LoggerOptions> | null | undefined) {
    // Use default options.
    const opts = { ...defaultOptions, ...options };

    // Set logger status.
    this.active = opts.active === true;

    // Set default log context.
    this.defaultContext = opts.defaultContext;

    // Set logs filter.
    this.filter = opts.filter;

    // Set minimal log level.
    this.level = opts.level;

    // Set logger name.
    this.name = opts.name == null ? `logger_${Date.now()}` : String(opts.name);

    // Set log outputs.
    this.outputs = opts.outputs;

    if (typeof this.outputs !== 'object' || !(this.outputs instanceof Array) || this.outputs.length === 0) {
      throw new Error('Logger outputs cannot be empty.');
    }
  }

  /**
   * Logs a debug message.
   */
  debug(message:string, context?:LoggerContext) {
    this.log(DEBUG, message, context);
  }

  /**
   * Logs an error message.
   */
  error(messageOrError:string|Error, context?:LoggerContext) {
    const ctx = context || {};
    let message:string

    if (messageOrError instanceof Error) {
      message = messageOrError.message;
      ctx.error = getErrorDetails(messageOrError);
    } else {
      message = messageOrError
    }
    this.log(ERROR, message, ctx);
  }

  /**
   * Logs a fatal error message.
   */
  fatal(messageOrError:string|Error, context?:LoggerContext) {
    const ctx = context || {};
    let message:string

    if (messageOrError instanceof Error) {
      message = messageOrError.message;
      ctx.error = getErrorDetails(messageOrError);
    } else {
      message = messageOrError
    }
    this.log(FATAL, message, ctx);
  }

  /**
   * Returns the log level.
   */
  getLevel(): Levels {
    return this.level;
  }

  /**
   * Returns the logger name.
   */
  getName(): string {
    return this.name;
  }

  /**
   * Logs an informational message.
   */
  info(message: string, context?:LoggerContext) {
    this.log(INFO, message, context);
  }

  /**
   * Checks if the logging is active.
   */
  isActive(): boolean {
    return this.active === true;
  }

  /**
   * Logs a message with a certain level.
   */
  log(level: Levels, message: string, context?:LoggerContext) {
    // Ignore if logger is not active or if log level is higher.
    if (!this.isActive() || level > this.level) {
      return;
    }

    // Prepare log event.
    const event:LoggerEvent = {
      context: this.defaultContext ? { ...this.defaultContext, ...context } : context,
      level,
      logger: this.name,
      message,
      timestamp: Date.now(),
    };

    // Filter log event.
    if (typeof this.filter === 'function' && this.filter(event) !== true) {
      return;
    }

    // Pass log event to outputs.
    this.outputs.forEach((output) => {
      output(event);
    });
  }

  /**
   * Enables or disables logging.
   */
  setActive(active: boolean) {
    this.active = active === true;
  }

  /**
   * Changes the log level.
   */
  setLevel(level: Levels) {
    this.level = level;
  }

  /**
   * Logs a warning message.
   */
  warn(message: string, context = undefined) {
    this.log(WARN, message, context);
  }
}

export default Logger
