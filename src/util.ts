import { levelToString } from "./levels";
import { errorDetails, LoggerEvent } from "./struct";

type TupleToUnion<T extends any[]> = T[number];
/**
 * Returns details of an error.
 */
export function getErrorDetails(error:Error):errorDetails {
  const attributes = ['message', 'name', 'stack'] as const;
  const details:errorDetails = {};

  for (let i = 0; i < attributes.length; i += 1) {
    if (attributes[i] in error) {
      details[attributes[i]] = error[attributes[i]];
    }
  }
  return details;
}

export function defaultFormatter(event:LoggerEvent): string {
  const {
    context,
    level,
    logger,
    message,
    timestamp,
  } = event;
  const date = new Date(timestamp)
  let out = `[${date.toLocaleDateString()}] [${date.toLocaleTimeString()}] ${levelToString(level)} [${logger}] : ${message}`;

  if (context) {
    out += ` ; ${JSON.stringify(context)}`;
  }
  return out;
}
