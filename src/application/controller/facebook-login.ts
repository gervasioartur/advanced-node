import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { ValidationBuilder, Validator } from '@/application/validation'
import { Controller } from '@/application/controller'

type HttpRequest = {
  token: string
}
type Model = Error | {
  accessToken: string
}

export class FacebookLoginController extends Controller {
  constructor (
    private readonly facebookAuth: FacebookAuthentication
  ) {
    super()
  }

  async perform (httRequest: any): Promise<HttpResponse<Model>> {
    const accessToken = await this.facebookAuth.perform({ token: httRequest.token })
    return accessToken instanceof AccessToken ? ok({ accessToken: accessToken.value }) : unauthorized()
  }

  override buildValidators (httRequest: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: httRequest.token, fieldName: 'token' }).required().build()
    ]
  }
}
