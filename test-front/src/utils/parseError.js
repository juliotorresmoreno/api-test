
// @flow

export default function parseError<T>(error: String): T {
  const errorSplit = error.split(':');
  if (errorSplit.length === 2) {
    const result: T = {
      [errorSplit[0]]: errorSplit[1],
      error: error
    };
    return result;
  }
  const result: T = {
    error: error
  };
  return result;
}
