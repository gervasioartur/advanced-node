export namespace HttpGetClient {
  export type Input = {
    url: string
    params: object
  }
  export type Output = any
}

export interface HttpGetClient {
  get: <T = any> (params: HttpGetClient.Input) => Promise<T>
}
