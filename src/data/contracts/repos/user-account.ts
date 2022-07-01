export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }
}

export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<void>
}
