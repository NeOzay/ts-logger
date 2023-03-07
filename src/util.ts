interface errorDetails {
message: string
name: string
reason: string
stack: string
type: string
}
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
