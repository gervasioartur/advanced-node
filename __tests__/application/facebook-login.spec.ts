import { FacebookAuthentication } from '@/domain/features'
import { mock } from 'jest-mock-extended'

type HttpResponse = {
  statusCode: number
  data: any
}

export class FacebookLoginController {
  constructor (
    private readonly facebookAuth: FacebookAuthentication
  ) { }

  async handle (httRequest: any): Promise<HttpResponse> {
    await this.facebookAuth.perform({ token: httRequest.token })
    return {
      statusCode: 400,
      data: new Error('The field token is required')
    }
  }
}

describe('FacebookLoginController', () => {
  it('should return  400 if token empty', async () => {
    const facebookAuth = mock<FacebookAuthentication>()
    const sut = new FacebookLoginController(facebookAuth)
    const httResponse = await sut.handle({ token: '' })
    expect(httResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should return  400 if token is null', async () => {
    const facebookAuth = mock<FacebookAuthentication>()
    const sut = new FacebookLoginController(facebookAuth)
    const httResponse = await sut.handle({ token: null })
    expect(httResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should return  400 if token is undefined', async () => {
    const facebookAuth = mock<FacebookAuthentication>()
    const sut = new FacebookLoginController(facebookAuth)
    const httResponse = await sut.handle({ token: undefined })
    expect(httResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should call FacebookAthentication with correct params', async () => {
    const facebookAuth = mock<FacebookAuthentication>()
    const sut = new FacebookLoginController(facebookAuth)
    await sut.handle({ token: 'any_valid_token' })
    expect(facebookAuth.perform).toHaveBeenLastCalledWith({ token: 'any_valid_token' })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })
})
