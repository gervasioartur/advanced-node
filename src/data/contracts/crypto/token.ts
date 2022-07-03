export namespace TokenGenerator {
  export type Params = {
    key: string
    expirationInMs: number
  }
}
export interface TokenGenerator {
  generateToken: (params: TokenGenerator.Params) => Promise<void>
}
