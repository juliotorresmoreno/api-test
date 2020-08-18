

export class APIError<T> extends Error {
  details: T
}