export namespace TokenGenerator {
  export type Input = {
    key: string
    expirationInMs: number
  }

  export type Output = string
}

export interface TokenGenerator {
  generateToken: (params: TokenGenerator.Input) => Promise<TokenGenerator.Output>
}

export namespace TokenValidator {
  export type Input = { token: string }
  export type Output = string
}

export interface TokenValidator {
  validateToken: (params: TokenValidator.Input) => Promise<TokenValidator.Output>
}
