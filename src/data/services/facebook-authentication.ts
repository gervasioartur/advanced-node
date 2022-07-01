import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUser: LoadFacebookUserApi
  ) {}

  async perfom (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUser.loadUser(params)
    return new AuthenticationError()
  }
}
