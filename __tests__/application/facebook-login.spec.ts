import { FacebookAuthentication } from '@/domain/features'
import { mock, MockProxy } from 'jest-mock-extended'

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
  let sut: FacebookLoginController
  let facebookAuth: MockProxy<FacebookAuthentication>

  beforeAll(() => {
    facebookAuth = mock()
  })

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth)
  })

  it('should return  400 if token empty', async () => {
    const httResponse = await sut.handle({ token: '' })
    expect(httResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should return  400 if token is null', async () => {
    const httResponse = await sut.handle({ token: null })
    expect(httResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should return  400 if token is undefined', async () => {
    const httResponse = await sut.handle({ token: undefined })
    expect(httResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })

  it('should call FacebookAthentication with correct params', async () => {
    await sut.handle({ token: 'any_valid_token' })
    expect(facebookAuth.perform).toHaveBeenLastCalledWith({ token: 'any_valid_token' })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })
})
