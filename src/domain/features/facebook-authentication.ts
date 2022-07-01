import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '@/domain/errors/authenticatio-error'

export namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError

}

export interface FacebookAuthentication {
  perform: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}
