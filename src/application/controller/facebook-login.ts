import { badRequest, HttpResponse, serverError, unauthorized } from '@/application/helpers'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { RequiresField } from '@/application/errors'

export class FacebookLoginController {
  constructor (
    private readonly facebookAuth: FacebookAuthentication
  ) { }

  async handle (httRequest: any): Promise<HttpResponse> {
    try {
      if (httRequest.token === '' || httRequest.token === null || httRequest.token === undefined) {
        return badRequest(new RequiresField('token'))
      }
      const accessToken = await this.facebookAuth.perform({ token: httRequest.token })
      if (accessToken instanceof AccessToken) {
        return {
          statusCode: 200,
          data: {
            accessToken: accessToken.value
          }
        }
      } else {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
