export class SeverError extends Error {
  constructor (error?: any) {
    super('Internal server Error, try again later or call the suport')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class RequiresField extends Error {
  constructor (fieldname: string) {
    super(`The field ${fieldname} is required`)
    this.name = 'RequiresFied'
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('unauthorized')
    this.name = 'UnauthorizedError'
  }
}
