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
function consoleOutput(options? : { formatter?: (event: LoggerEvent) => string; entries?: unknown[] }): ((arg0: LoggerEvent) => void) {
  const opts = { formatter: defaultFormatter, ...options };
  const {formatter, entries} = opts;

  const harvest = (message:string) => {
    entries?.push(message);
  };

  const debug = entries ? harvest : console.debug ?? console.log;
  const error = entries ? harvest : console.error ?? console.log;
  const fatal = entries ? harvest : console.error ?? console.log;
  const info = entries ? harvest : console.info ?? console.log;
  const warn = entries ? harvest : console.warn ?? console.log;

  return (event) => {
    const { level } = event;

    // Prepare output.
    let output = formatter(event);

    switch (level) {
      case DEBUG:
        debug(output)
        return
      case INFO:
        info(output)
        return
      case WARN:
        warn(output)
        return
      case ERROR:
        
        error(output);
        return
      case FATAL:
        fatal(output);
        return
    }
  };
}

export default consoleOutput;

