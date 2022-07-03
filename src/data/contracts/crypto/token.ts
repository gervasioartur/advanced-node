export namespace TokenGenerator {
  export type Params = {
    key: string
  }
}
export interface TokenGenerator {
  generateToken: (params: TokenGenerator.Params) => Promise<void>
}
