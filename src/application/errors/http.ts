export class SeverError extends Error {
  constructor (error?: any) {
    super('Internal server Error, try again later or call the suport')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
