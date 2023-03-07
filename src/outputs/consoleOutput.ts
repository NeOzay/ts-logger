import {
  DEBUG,
  ERROR,
  FATAL,
  INFO,
  WARN,
} from '../levels';
import { LoggerEvent } from '../struct';
import { defaultFormatter } from '../util';

/**
 * Logs events to console.
 */
function consoleOutput(options? : { formatter?: (event: LoggerEvent) => string; }): ((arg0: LoggerEvent) => void) {
  const opts = { formatter: defaultFormatter, ...options };
  const {formatter} = opts;

 
  const debug = console.debug ?? console.log;
  const error = console.error ?? console.log;
  const fatal = console.error ?? console.log;
  const info = console.info ?? console.log;
  const warn = console.warn ?? console.log;

  return (event) => {
    const { level } = event;

    // Prepare output.
    let output = formatter(event);

    switch (level) {
      case DEBUG:
        debug(output)
      case INFO:
        info(output)
      case WARN:
        warn(output)
      case ERROR:
        error(output);
      case FATAL:
        fatal(output);
    }
  };
}

export default consoleOutput;

