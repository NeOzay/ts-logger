import { levelToString } from "./levels";
import { errorDetails, LoggerEvent } from "./struct";

/**
 * Returns details of an error.
 */
export function getErrorDetails(error:Error):errorDetails {
  const attributes = ['message', 'name', 'reason', 'stack', 'type'];
  const details = {};

  for (let i = 0; i < attributes.length; i += 1) {
    if (attributes[i] in error) {
      details[attributes[i]] = error[attributes[i]];
    }
  }
  return details as errorDetails;
}

export function defaultFormatter(event:LoggerEvent): string {
  const {
    context,
    level,
    logger,
    message,
    timestamp,
  } = event;

  let out = `${new Date(timestamp).toISOString()} ${levelToString(level)} [${logger}] : ${message}`;

  if (context) {
    out += ` ; ${JSON.stringify(context)}`;
  }
  return out;
}