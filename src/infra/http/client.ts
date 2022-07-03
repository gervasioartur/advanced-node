export namespace HttpGetClient {
  export type Params = {
    url: string
    params: object
  }
}

export interface HttpGetClient {
  get: (params: HttpGetClient.Params) => any
}
