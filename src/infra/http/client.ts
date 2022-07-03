export namespace HttpGetClient {
  export type Params = {
    url: string
    params: object
  }
  export type Result = any
}

export interface HttpGetClient {
  get: <T = any> (params: HttpGetClient.Params) => Promise<T>
}
