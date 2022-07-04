import { badRequest, HttpResponse, ok, serverError, unauthorized } from '@/application/helpers'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { RequiredStringValidator } from '../validation'

type HttpRequest = {
  token: string
}
type Model = Error | {
  accessToken: string
}

export class FacebookLoginController {
  constructor (
    private readonly facebookAuth: FacebookAuthentication
  ) { }

  async handle (httRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httRequest)
      if (error !== undefined) {
        return badRequest(error)
      }
      const accessToken = await this.facebookAuth.perform({ token: httRequest.token })
      if (accessToken instanceof AccessToken) {
        return ok({ accessToken: accessToken.value })
      } else {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }

  private validate (httRequest: HttpRequest): Error | undefined {
    const validator = new RequiredStringValidator(httRequest.token, 'token')
    return validator.validate()
  }
}
