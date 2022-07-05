import { AuthenticationError } from '@/domain/errors/authenticatio-error'
import { AccessToken } from '@/domain/models'

export namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError

}

export interface FacebookAuthentication {
  perform: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}
