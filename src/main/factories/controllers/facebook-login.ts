import { FacebookLoginController } from '@/application/controller'
import { makeFacebookAuthenticationService } from '@/main/factories/services'

export const makeFacebookLoginController = (): FacebookLoginController => {
  return new FacebookLoginController(makeFacebookAuthenticationService())
}
